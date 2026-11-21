import type { Project } from './projects';
export const hr: Project = {
  "id": "hr-analytics",
  "title": "Employee Attrition Analysis",
  "category": "Data Analytics",
  "description": "Understanding workforce turnover through SQL analysis and interactive Power BI dashboards.",
  "accent": "sage",
  "cover": "images/hr/powerbi/01-overview.png",
  "technologies": [
    "Python",
    "SQL",
    "PostgreSQL",
    "Power BI",
    "DAX",
    "pandas",
    "Matplotlib"
  ],
  "slides": [
    { id: 'power-bi', kind: 'screenshots', title: 'Power BI report pages', gallery: [
      { title: 'Attrition Overview', image: 'images/hr/powerbi/01-overview.png', caption: '237 of 1,470 employees left (16.12%). Compare rates with department and role headcounts when prioritising follow-up.' },
      { title: 'Attrition Factors', image: 'images/hr/powerbi/02-factors.png', caption: 'Observed attrition was 30.53% with overtime and 10.44% without. Review workload alongside related factors before drawing conclusions.' },
      { title: 'Employee Segments & HR Actions', image: 'images/hr/powerbi/03-segments.png', caption: 'The leading qualifying group has 14 leavers among 20 employees. Check small groups against their headcounts.' },
    ] },
    { id: 'source-files', kind: 'repository', title: 'HR project files', links: [
      { label: 'Power BI report', url: 'downloads/hr/HR-Attrition-Report.pbix' },
      { label: 'Original SQL', url: 'downloads/hr/hr_employee.sql' },
      { label: 'DAX measures', url: 'downloads/hr/Measures.dax' },
    ] },
    { id: 'quality-check', kind: 'architecture', title: 'SQL missing-value check', code: "SELECT\n\tCOUNT(*) AS total_rows,\n\tCOUNT(*) FILTER (WHERE Attrition IS NULL) AS missing_attrition,\n\tCOUNT(*) FILTER (WHERE Age IS NULL) AS missing_age,\n\tCOUNT(*) FILTER (WHERE Department IS NULL) AS missing_department,\n\tCOUNT(*) FILTER (WHERE MonthlyIncome IS NULL) AS missing_income\nFROM hr_employee_attrition;", caption: 'Conditional counts check attrition, age, department and income before comparing groups.' },
    {
      "id": "overview",
      "kind": "overview",
      "title": "HR Analytics — Employee Attrition",
      "body": "Employee attrition comparisons using Python analysis charts."
    },
    {
      "id": "method",
      "kind": "architecture",
      "title": "Methodology",
      "body": "The local project includes a Python notebook, SQL analysis and exported charts comparing attrition across employee groups. Observed associations do not establish causes."
    },
    {
      "id": "02_attrition_by_department",
      "kind": "screenshots",
      "title": "Attrition by department",
      "image": "images/hr/02_attrition_by_department.png",
      "imageAlt": "Attrition by department",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "03_attrition_by_job_role",
      "kind": "screenshots",
      "title": "Attrition by job role",
      "image": "images/hr/03_attrition_by_job_role.png",
      "imageAlt": "Attrition by job role",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "04_attrition_by_overtime",
      "kind": "screenshots",
      "title": "Attrition by overtime",
      "image": "images/hr/04_attrition_by_overtime.png",
      "imageAlt": "Attrition by overtime",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "05_attrition_by_income",
      "kind": "screenshots",
      "title": "Attrition by income",
      "image": "images/hr/05_attrition_by_income.png",
      "imageAlt": "Attrition by income",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "06_attrition_by_distance",
      "kind": "screenshots",
      "title": "Attrition by distance",
      "image": "images/hr/06_attrition_by_distance.png",
      "imageAlt": "Attrition by distance",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "07_attrition_by_age",
      "kind": "screenshots",
      "title": "Attrition by age",
      "image": "images/hr/07_attrition_by_age.png",
      "imageAlt": "Attrition by age",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "08_attrition_by_job_satisfaction",
      "kind": "screenshots",
      "title": "Attrition by job satisfaction",
      "image": "images/hr/08_attrition_by_job_satisfaction.png",
      "imageAlt": "Attrition by job satisfaction",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "09_attrition_by_work_life_balance",
      "kind": "screenshots",
      "title": "Attrition by work life balance",
      "image": "images/hr/09_attrition_by_work_life_balance.png",
      "imageAlt": "Attrition by work life balance",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    },
    {
      "id": "10_attrition_by_promotion_wait",
      "kind": "screenshots",
      "title": "Attrition by promotion wait",
      "image": "images/hr/10_attrition_by_promotion_wait.png",
      "imageAlt": "Attrition by promotion wait",
      "caption": "Original chart exported by the supplied HR attrition analysis."
    }
  ]
};
