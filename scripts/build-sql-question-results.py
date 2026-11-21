"""Rebuild the public question results from the local AdyLearn CSV and SQL files."""
import csv
import itertools
import json
import re
import sqlite3
import sys
import textwrap
from pathlib import Path

root = Path(sys.argv[1])
coffee = root / 'CoffeeSaes/excel-project-coffee-sales-main'
retail = root / 'OnlineRetailUCI/CompleteProject'
hr = root / 'HRAnalytics'
db = sqlite3.connect(':memory:')

def load(path, name, columns):
    definitions = ', '.join(f'"{key}" {kind}' for key, kind, source in columns)
    db.execute(f'CREATE TABLE {name} ({definitions})')
    marks = ', '.join('?' for _ in columns)
    with path.open(encoding='utf-8-sig', newline='') as stream:
        source_rows = csv.DictReader(stream)
        db.executemany(f'INSERT INTO {name} VALUES ({marks})', (
            [row[source].strip() or None for _, _, source in columns] for row in source_rows
        ))

load(coffee / 'orders.csv', 'orders', [
    ('orderid','TEXT','Order ID'), ('customerid','TEXT','Customer ID'),
    ('sales','REAL','Sales'), ('quantity','INTEGER','Quantity'),
    ('country','TEXT','Country'), ('coffeetypename','TEXT','Coffee Type Name'),
])
load(retail / 'cleaned_online_retail_sales.csv', 'retail_sales', [
    ('Invoice','TEXT','Invoice'), ('CustomerID','TEXT','CustomerID'),
    ('Country','TEXT','Country'), ('Revenue','REAL','Revenue'), ('StockCode','TEXT','StockCode'),
    ('Description','TEXT','Description'), ('Quantity','INTEGER','Quantity'),
])
load(hr / 'HR-Employee-Attrition.csv', 'employees', [
    ('Department','TEXT','Department'), ('JobRole','TEXT','JobRole'),
    ('OverTime','TEXT','OverTime'), ('Attrition','TEXT','Attrition'),
])
db.execute("CREATE VIEW hr_analysis AS SELECT *, CASE WHEN Attrition='Yes' THEN 1 ELSE 0 END AS attrition_flag FROM employees")

def query(path, marker, prefix=None):
    source = path.read_text(encoding='utf-8-sig')
    tail = source.split(marker, 1)[1].split('\n',1)[1] if marker else source
    start = re.search(r'(?im)^\s*(SELECT|WITH)\b', tail).start()
    result = re.split(r'(?m)^--', tail[start:].lstrip(), maxsplit=1)[0].strip()
    if prefix and not result.upper().startswith(prefix):
        raise ValueError(marker)
    return textwrap.dedent(result).replace('\t','    ')

cards = {}
def record(project, id, title, path, marker, columns, explanation, finding, decision, action, kpi,
           chart=None, dashboard=None, decimals=(), hr_rate=False, sorted_by=None):
    code = query(path, marker)
    runnable = re.sub(r'OnlineRetail\.\.OnlineRetail\b', 'retail_sales', code, flags=re.I)
    rows = db.execute(runnable).fetchall()
    if sorted_by is not None:
        rows.sort(key=lambda row: -row[sorted_by])
    if hr_rate:
        rows = [(*row, round(row[-2] * 100 / row[-3], 2)) for row in rows]
    assert rows and all(len(row) == len(columns) for row in rows), id
    export = None
    if len(rows) > 50:
        export = f'sql-results/{id}.csv'
        with (Path('public') / export).open('w', newline='', encoding='utf-8-sig') as stream:
            writer = csv.writer(stream)
            writer.writerow(columns)
            writer.writerows(rows)
    cards.setdefault(project, []).append(dict(
        id=id, title=title, source=path.name, code=code, columns=columns,
        rows=rows[:10] if export else rows, rowCount=len(rows), export=export,
        explanation=explanation, finding=finding, decision=decision, action=action, kpi=kpi,
        dashboard=dashboard, chart=chart, decimals=decimals, hrRate=hr_rate,
    ))

c = coffee / 'AggregationKPI.sql'
record('coffee-sales','coffee-totals','What sales volume and revenue did the business record?',c,'-- 9)', ['Revenue','Units','Orders','Customers'],
       'SUM totals sales and quantities. COUNT DISTINCT prevents repeated order and customer IDs inflating those KPIs.',
       '45,135.35 across 957 orders is the sales baseline. The 3,551 units measure volume independently of order count.',
       'Use the baseline to compare sales performance across periods.','Review revenue, units and order counts together each month.','Monthly revenue and distinct orders',
       dashboard='images/coffee/dashboard-1.png', decimals=[0])
record('coffee-sales','coffee-types','Which coffee types lead revenue and unit sales?',c,'-- 13)', ['Revenue','Units','Coffee type'],
       'GROUP BY coffee type supports separate comparisons of SUM(sales) and SUM(quantity).',
       'Excelsa leads revenue at 12,306.71. Comparing revenue with units helps separate product value from volume.',
       'Decide which coffee types warrant an inventory review.','Compare demand with stock availability and margins before adjusting stock.','Units sold and stockout rate by coffee type',
       chart=[2,0],dashboard='images/coffee/dashboard-1.png',decimals=[0])
record('coffee-sales','coffee-country','Which markets contribute the most coffee revenue?',c,'-- 15)', ['Country','Revenue','Orders','Customers','Average order value'],
       'The query groups by country, counts distinct invoices and customers, and divides revenue by each market’s order count.',
       'The United States contributes 35,639.73, about 79% of revenue. A large share of sales depends on one market.',
       'Decide where to examine sales concentration first.','Track market shares and investigate demand in smaller markets before expanding.','Revenue share by market',
       chart=[0,1],dashboard='images/coffee/dashboard-1.png',decimals=[1,4],sorted_by=1)

rp=Path('public/retail/sql')
record('online-retail','retail-totals','What revenue, orders, customers and order value did retail record?',rp/'RevenueAnalysis.sql',None,['Revenue','Orders','Customers','Average order value'],
       'A CTE aggregates sales and counts distinct invoices and customers before calculating average order value.',
       'The cleaned dataset contains 17,743,429.18 in positive sales over 36,969 distinct invoices. These totals exclude returns.',
       'Set a baseline for retail reporting.','Track positive sales separately from returns and net revenue.','Positive sales and return rate',
       dashboard='images/retail/sales_overview.png',decimals=[0,3])
record('online-retail','retail-country','Which countries contribute the most retail revenue?',rp/'Country_Analysis.sql','-- Top countries',['Country','Revenue','Orders','Customers'],
       'GROUP BY Country measures market revenue and distinct counts at the same level.',
       'The UK generated about 82.98% of retained sales revenue. Other markets account for a much smaller share.',
       'Prioritise a review of exposure to the UK market.','Monitor the country mix and investigate non-UK demand before making expansion decisions.','Country revenue share',
       chart=[0,1],dashboard='images/retail/sales_overview.png',decimals=[1])
record('online-retail','retail-product','Which stock-code and description combinations lead sales?',rp/'ProductAnalysis.sql','GROUP BY StockCode, Description, Price',['Stock code','Description','Revenue','Units','Orders'],
       'Groups by both stock code and description, then ranks revenue. A stock code can appear under different descriptions.',
       'The leading row is stock code 22423. Revenue rankings should be read alongside volumes and stock-code definitions.',
       'Identify products to examine for assortment and inventory planning.','Group consistently by stock code and separate nonmerchandise entries before changing the assortment.','Units sold and revenue by stock code',
       chart=[0,2],dashboard='images/retail/product_performance.png',decimals=[2])

h=Path('public/downloads/hr/hr_employee.sql')
for num,group,title,finding,decision,action,kpi in [
    (1,None,'What is the overall employee attrition rate?','237 of 1,470 employees left. The decimal snapshot baseline is 16.12%.','Set a baseline for comparing groups.','Compare future snapshots using the same definition.','Attrition rate and leaver count'),
    (2,'Department','Which departments have the highest employee attrition rates?','Sales has the highest decimal rate at 20.63%, followed by Human Resources at 19.05%. Research & Development has the most leavers in absolute terms (133).','Use both rates and counts to prioritise investigation.','Review workload and employee feedback in Sales, and examine the volume of departures in R&D.','Department attrition rate and leaver count'),
    (3,'Job role','Which job roles show the highest attrition rates?','Sales Representatives have the highest observed rate. Group sizes differ across roles and affect the interpretation.','Identify roles that warrant a closer retention review.','Ask HR to investigate job conditions and compare rates alongside role headcounts.','Attrition rate and headcount by role'),
    (4,'Overtime','How does overtime relate to employee attrition?','The decimal rate is 30.53% with overtime and 10.44% without. The comparison is observational.','Decide whether workload patterns warrant review.','Compare overtime allocation with role, staffing and employee feedback.','Overtime hours and attrition rate'),
]:
    headers = ([group] if group else [])+['Employees','Leavers','Original SQL rate (%)','Decimal rate (%)']
    record('hr-analytics',f'hr-{num}',title,h,f'--Q{num})',headers,
           'SUM counts leavers via the CASE-derived flag. COUNT counts employees. The original integer expression truncates before ROUND.',
           finding,decision,action,kpi,chart=[0,4] if group else None,hr_rate=True,
           dashboard='images/hr/powerbi/02-factors.png' if num==4 else 'images/hr/powerbi/01-overview.png',
           decimals=[len(headers)-2,len(headers)-1])

assert cards['hr-analytics'][1]['rows'][0] == ('Sales', 446, 92, 20.0, 20.63)
assert cards['coffee-sales'][0]['rows'][0][1:] == (3551,957,913)
assert cards['online-retail'][0]['rows'][0] == (17743429.18,36969,5878,479.95)
Path('src/data/sqlQuestionResults.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2,default=str)+'\n',encoding='utf-8')
for project, questions in cards.items():
    print(project, [(q['id'],q['rowCount'],q['rows'][0]) for q in questions])
