"""Generate portfolio query tables from local CSVs and an isolated PostgreSQL cluster."""
import csv
import io
import json
import os
from pathlib import Path
import re
import sqlite3
import subprocess
import sys

root = Path(sys.argv[1])
psql = Path(sys.argv[2])
coffee = root / 'CoffeeSaes/excel-project-coffee-sales-main'
hr = root / 'HRAnalytics'
retail = root / 'OnlineRetailUCI/CompleteProject'
sql_dir = Path('public/retail/sql')
output = Path('public/sql-results')
output.mkdir(parents=True, exist_ok=True)
results = {}

def read(path):
    return path.read_text(encoding='utf-8-sig')

def pg(sql, params=()):
    return subprocess.run(
        [str(psql), '-X', '-w', '-h', '127.0.0.1', '-p', '55482',
         '-U', 'portfolio_check', '-d', 'postgres', '-v', 'ON_ERROR_STOP=1',
         *params],
        input=sql, capture_output=True, encoding='utf-8',
        env={**os.environ, 'PGCLIENTENCODING': 'UTF8'},
    )

def initialise():
    hr_script = read(Path('public/downloads/hr/hr_employee.sql'))
    hr_ddl = hr_script[hr_script.index('CREATE TABLE'):hr_script.index('--Check if Import works')]
    hr_view = hr_script[hr_script.index('CREATE VIEW hr_analysis'):hr_script.index('--Q1)')]
    coffee_ddl = re.sub(r'(?m)^\)\s*$', ');', read(coffee / 'TableSQL.sql'))
    sources = [(name, coffee / f'{name}.csv') for name in ('orders', 'customers', 'products')]
    sources.append(('hr_employee_attrition', hr / 'HR-Employee-Attrition.csv'))
    copies = '\n'.join(
        "\\copy " + name + " FROM '" + path.as_posix().replace("'", "''") + "' WITH (FORMAT csv, HEADER true)"
        for name, path in sources
    )
    setup = '\n'.join((
        'DROP VIEW IF EXISTS hr_analysis;',
        'DROP TABLE IF EXISTS orders, customers, products, hr_employee_attrition;',
        "SET datestyle TO 'ISO, DMY';", coffee_ddl, hr_ddl, copies, hr_view,
    ))
    res = pg(setup)
    if res.returncode:
        raise RuntimeError(res.stderr)

def numbered(path, pattern):
    chunks = re.split(pattern, read(path), flags=re.M)
    for number, title, chunk in zip(chunks[1::3], chunks[2::3], chunks[3::3]):
        yield number, title.strip(), clean(chunk)

def clean(text):
    lines = [line for line in text.strip().splitlines() if not line.lstrip().startswith('--')]
    return '\n'.join(line.expandtabs(4).rstrip() for line in lines).strip()

def display_header(name):
    aliases = {
        'count': 'Count', 'customerid': 'Customer ID', 'customername': 'Customer name',
        'orderid': 'Order ID', 'orderdate': 'Order date', 'productid': 'Product ID',
        'coffeetypename': 'Coffee type', 'coffeetype': 'Coffee type', 'roasttypename': 'Roast type',
        'employeeNumber': 'Employee number', 'jobrole': 'Job role', 'overtime': 'Overtime',
        'attrition_percentage': 'Attrition (%)', 'yearmonth': 'Year and month',
    }
    return aliases.get(name, aliases.get(name.lower(), name.replace('_', ' ').capitalize()))

def safe_value(name, value):
    key = name.lower().replace('_', '')
    if key in {'customerid', 'customername', 'email', 'phonenumber', 'addressline', 'postcode', 'orderid', 'employeenumber'}:
        return 'Redacted' if value is not None and value != '' else None
    if value == '':
        return None
    if isinstance(value, str) and key not in {'stockcode', 'productid', 'segment', 'rfmscore'}:
        if re.fullmatch(r'-?\d+(\.\d+)?', value):
            return float(value) if '.' in value else int(value)
    return value

def add(project, id, title, source, code, headers=(), rows=(), status=None):
    names = [display_header(name) for name in headers]
    if id == 'coffee-15' and len(names) == 5:
        names[2:4] = ['Orders', 'Customers']
    safe_rows = [[safe_value(name, value) for name, value in zip(headers, row)] for row in rows]
    export = None
    if len(safe_rows) > 10:
        export = f'sql-results/{id}.csv'
        with (Path('public') / export).open('w', newline='', encoding='utf-8-sig') as file:
            writer = csv.writer(file)
            writer.writerow(names)
            writer.writerows(
                [("'" + cell if isinstance(cell, str) and cell.lstrip().startswith(('=', '+', '-', '@')) else cell) for cell in row]
                for row in safe_rows
            )
    results.setdefault(project, []).append(dict(
        id=id, title=title, source=source, code=code, columns=names,
        rows=safe_rows[:10], rowCount=len(safe_rows), export=export, status=status,
    ))

def postgres_card(project, id, title, source, code):
    response = pg(code + '\n' + (';' if not code.endswith(';') else '') + '\n', ('--csv', '-q', '-P', 'footer=off'))
    if response.returncode:
        errors = {
            'coffee-19': 'No output. The source calls the undefined function COALESECE.',
            'coffee-29': 'No output. The source ends with an extra FROM clause.',
            'coffee-30': 'No output. The source starts with an incomplete WITH clause.',
            'coffee-36': 'No output. The source ends inside its CTE.',
            'coffee-39': 'No output. The source has syntax errors and ends before a final SELECT.',
        }
        if id not in errors:
            raise RuntimeError(f'{id}: {response.stderr}')
        add(project, id, title, source, code, status=errors[id])
    else:
        data = list(csv.reader(io.StringIO(response.stdout)))
        if not data:
            raise ValueError(id)
        state = 'No rows returned.' if len(data) == 1 else None
        if id == 'coffee-18':
            state = 'No rows returned. The source uses an inner join before filtering for missing orders.'
        add(project, id, title, source, code, data[0], data[1:], state)

def retail_tables(db):
    settings = [
        ('retail_sales', 'cleaned_online_retail_sales.csv', {
            'Invoice': 'TEXT', 'CustomerID': 'TEXT', 'Country': 'TEXT', 'Revenue': 'REAL',
            'StockCode': 'TEXT', 'Description': 'TEXT', 'Quantity': 'INTEGER', 'Price': 'REAL', 'YearMonth': 'TEXT',
        }),
        ('rfm_segments', 'customer_rfm_segments.csv', {
            'Segment': 'TEXT', 'Frequency': 'INTEGER', 'Monetary': 'REAL', 'Recency': 'INTEGER',
        }),
    ]
    for table, filename, columns in settings:
        db.execute(f"CREATE TABLE {table} (" + ', '.join(f'"{k}" {v}' for k,v in columns.items()) + ')')
        with (retail / filename).open(encoding='utf-8-sig', newline='') as file:
            db.executemany(f"INSERT INTO {table} VALUES (" + ','.join('?' for _ in columns) + ')', (
                [row[key].strip() or None for key in columns] for row in csv.DictReader(file)
            ))

def retail_cards():
    files = {
        'DataQuality.sql': (r'^-- Data quality check', ['How many records, invoices and customers are present, and which rows fail quality checks?']),
        'RevenueAnalysis.sql': (r'^--(?:Overall revenue KPI summary| Monthly revenue)', ['What are the overall revenue and order KPIs?', 'How do revenue and order KPIs vary by month?']),
        'ProductAnalysis.sql': (r'^-- (?:Top Products by revenue|Top Products by quantity sold|High Quantity, Low Revenue Products)', ['Which product and price combinations generate the most revenue?', 'Which products lead by revenue?', 'Which products sell the most units?', 'What is average unit revenue for products selling at least 1,000 units?']),
        'CustomerAnalysis.sql': (r'^-- (?:Top Customers by Revenue|Revenue Concentration| Customer Repeat Rate|Customer Repeat Rate)', ['Which customers generate the most revenue?', 'How much revenue comes from each customer decile?', 'What share of customers order more than once?']),
        'Country_Analysis.sql': (r'^-- (?:Top countries by revenue|Average Order Value by country)', ['Which countries generate the most revenue?', 'What is average order value by country?']),
        'RFMSegment.sql': (r'^-- RFM Segment Performance', ['How do customer count, revenue and average RFM metrics vary by segment?']),
    }
    with sqlite3.connect(':memory:') as db:
        retail_tables(db)
        index = 0
        for name, (pattern, titles) in files.items():
            blocks = re.split(pattern, read(sql_dir / name), flags=re.M)[1:]
            assert len(blocks) == len(titles), name
            for title, block in zip(titles, blocks):
                index += 1
                code = clean(block.partition('\n')[2])
                sql = code.replace('OnlineRetail..OnlineRetail', 'retail_sales').replace('OnlineRetail..RFMSegments', 'rfm_segments')
                # SQL Server AVG over INT truncates. Preserve that integer type in this replay.
                sql = re.sub(r'AVG\((Recency|Frequency)\)', r'CAST(AVG(\1) AS INTEGER)', sql)
                result = db.execute(sql)
                add('online-retail', f'retail-{index}', title, name, code, [col[0] for col in result.description], result.fetchall())

def build():
    initialise()
    coffee_questions = []
    pattern = r'^--[ \t]*(\d+)\)[ \t]*([^\n]+)'
    for filename in ('SimpleSummary.sql', 'AggregationKPI.sql', 'MultitableAnalysis.sql', 'AdvancedAnalysis.sql', 'QuestionSQL.sql'):
        for number, title, code in numbered(coffee / filename, pattern):
            if any(number == known[0] and code == known[3] for known in coffee_questions):
                continue
            coffee_questions.append((number, title, filename, code))
    for number, title, source, code in sorted(coffee_questions, key=lambda q: int(q[0])):
        postgres_card('coffee-sales', f'coffee-{number}', title, source, code)
    retail_cards()
    path = Path('public/downloads/hr/hr_employee.sql')
    for number, title, code in numbered(path, r'^--Q(\d+[a-z]?)\)[ \t]*([^\n]+)'):
        title = {'4':'How does observed attrition compare by overtime status?', '8':'How does observed attrition vary by job satisfaction?', '9':'How does observed attrition vary by work-life balance?', '10':'How does observed attrition vary by time since promotion?', '11a':'How does the draft heuristic score rank records in this fictional dataset?'}.get(number, title)
        if number == '11a':
            code = code.split(';',1)[0]+';'
        postgres_card('hr-analytics', f'hr-{number}', title, path.name, code)

    assert [len(results[key]) for key in ('coffee-sales','online-retail','hr-analytics')] == [36,13,12]
    assert next(q for q in results['coffee-sales'] if q['id']=='coffee-9')['rows'][0][1:] == [3551,957,913]
    assert results['online-retail'][1]['rows'][0] == [17743429.18,36969,5878,479.95]
    assert results['hr-analytics'][1]['rows'][0] == ['Sales',446,92,20.0]
    Path('src/data/sqlQuestionResults.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for project, cards in results.items():
        print(project, len(cards), [(entry['id'], entry['rowCount']) for entry in cards])

if __name__ == '__main__':
    build()
