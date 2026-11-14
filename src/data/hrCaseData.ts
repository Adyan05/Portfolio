export const hrCaseData = {
  "checks": {
    "rows": 1470,
    "columns": 35,
    "missing": 0,
    "duplicateEmployees": 0,
    "duplicateRows": 0,
    "workbookDimension": "A1:AI1471"
  },
  "departments": [
    {
      "group": "Human Resources",
      "employees": 63,
      "leavers": 12,
      "rate": 19.05
    },
    {
      "group": "Research & Development",
      "employees": 961,
      "leavers": 133,
      "rate": 13.84
    },
    {
      "group": "Sales",
      "employees": 446,
      "leavers": 92,
      "rate": 20.63
    }
  ],
  "roles": [
    {
      "group": "Healthcare Representative",
      "employees": 131,
      "leavers": 9,
      "rate": 6.87
    },
    {
      "group": "Human Resources",
      "employees": 52,
      "leavers": 12,
      "rate": 23.08
    },
    {
      "group": "Laboratory Technician",
      "employees": 259,
      "leavers": 62,
      "rate": 23.94
    },
    {
      "group": "Manager",
      "employees": 102,
      "leavers": 5,
      "rate": 4.9
    },
    {
      "group": "Manufacturing Director",
      "employees": 145,
      "leavers": 10,
      "rate": 6.9
    },
    {
      "group": "Research Director",
      "employees": 80,
      "leavers": 2,
      "rate": 2.5
    },
    {
      "group": "Research Scientist",
      "employees": 292,
      "leavers": 47,
      "rate": 16.1
    },
    {
      "group": "Sales Executive",
      "employees": 326,
      "leavers": 57,
      "rate": 17.48
    },
    {
      "group": "Sales Representative",
      "employees": 83,
      "leavers": 33,
      "rate": 39.76
    }
  ],
  "preview": [
    [
      "41",
      "Yes",
      "Sales",
      "Sales Executive",
      "Yes",
      "5993",
      "4",
      "1"
    ],
    [
      "49",
      "No",
      "Research & Development",
      "Research Scientist",
      "No",
      "5130",
      "2",
      "3"
    ],
    [
      "37",
      "Yes",
      "Research & Development",
      "Laboratory Technician",
      "Yes",
      "2090",
      "3",
      "3"
    ],
    [
      "33",
      "No",
      "Research & Development",
      "Research Scientist",
      "Yes",
      "2909",
      "3",
      "3"
    ],
    [
      "27",
      "No",
      "Research & Development",
      "Laboratory Technician",
      "No",
      "3468",
      "2",
      "3"
    ],
    [
      "32",
      "No",
      "Research & Development",
      "Laboratory Technician",
      "No",
      "3068",
      "4",
      "2"
    ],
    [
      "59",
      "No",
      "Research & Development",
      "Laboratory Technician",
      "Yes",
      "2670",
      "1",
      "2"
    ],
    [
      "30",
      "No",
      "Research & Development",
      "Laboratory Technician",
      "No",
      "2693",
      "3",
      "3"
    ]
  ],
  "headers": [
    "Age",
    "Attrition",
    "Department",
    "JobRole",
    "OverTime",
    "MonthlyIncome",
    "JobSatisfaction",
    "WorkLifeBalance"
  ],
  "queries": [
    {
      "id": 1,
      "question": "What is the overall attrition rate?",
      "sql": "SELECT \n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND"
      ],
      "explanation": "Counts all employees and sums the binary attrition flag to calculate the dataset-level proportion.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 2,
      "question": "Which department has the highest attrition?",
      "sql": "SELECT \n\tDepartment,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY department\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 3,
      "question": "Which job roles have the highest attrition?",
      "sql": "SELECT\n\tJobRole,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY JobRole\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 4,
      "question": "Does overtime increase attrition?",
      "sql": "SELECT\n\tOverTime,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY OverTime\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 5,
      "question": "Are low-income employees more likely to leave?",
      "sql": "SELECT \n\tincome_band,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY income_band\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 6,
      "question": "Does distance from home affect attrition?",
      "sql": "SELECT\n\tdistance_band,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY distance_band\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 7,
      "question": "Are younger employees leaving more?",
      "sql": "SELECT\n\tage_group,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY age_group\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 8,
      "question": "Does job satisfaction affect attrition?",
      "sql": "SELECT\n\tsatisfaction_level,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY satisfaction_level\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 9,
      "question": "Does work-life balance affect attrition?",
      "sql": "SELECT\n\tworklifebalance_group,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY worklifebalance_group\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 10,
      "question": "Are employees leaving because of slow promotion?",
      "sql": "SELECT\n\tpromotion_wait_band,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage,\n\tROUND(AVG(YearsInCurrentRole),2) AS avg_years_in_current_role,\n\tROUND(AVG(YearsSinceLastPromotion),2) AS avg_years_since_last_promotion,\n\tROUND(AVG(YearsAtCompany),2) AS avg_years_at_company\nFROM hr_analysis\nGROUP BY promotion_wait_band\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY",
        "AVG"
      ],
      "explanation": "Groups employees by the selected characteristic and compares employee counts, leaver counts and the proportion leaving.",
      "learning": "I learned to compare group sizes alongside percentages and check numeric division before rounding."
    },
    {
      "id": 11,
      "question": "Which employee segments are high risk?",
      "sql": "SELECT\n\tDepartment,\n\tJobRole,\n\tage_group,\n\tOverTime,\n\tincome_band,\n\tCOUNT(*) AS total_employees,\n\tSUM(attrition_flag) AS employees_left,\n\tROUND(100 * SUM(attrition_flag) / COUNT(*), 2) AS attrition_percentage\nFROM hr_analysis\nGROUP BY Department, JobRole, age_group, OverTime, income_band\nHAVING COUNT(*) >=5\nORDER BY attrition_percentage DESC;",
      "source": "hr_employee.sql",
      "techniques": [
        "SELECT",
        "COUNT",
        "SUM",
        "ROUND",
        "GROUP BY",
        "ORDER BY",
        "HAVING"
      ],
      "explanation": "Combines department, job role, age band, overtime and income band; HAVING retains groups of at least five employees.",
      "learning": "I used HAVING to apply a minimum group size after aggregation."
    }
  ],
  "view": "CREATE VIEW hr_analysis AS\nSELECT *,\n\tCASE \n\t\tWHEN attrition='Yes' THEN 1\n\t\tELSE 0\n\tEND AS attrition_flag,\n\n\tCASE\n\t\tWHEN Age < 25 THEN 'Under 25'\n\t\tWHEN Age BETWEEN 25 AND 34 THEN '25-34'\n\t\tWHEN AGE BETWEEN 35 AND 44 THEN '35-44'\n\t\tWHEN AGE BETWEEN 45 AND 54 THEN '45-54'\n\t\tELSE 'Over 55'\n\tEND AS age_group,\n\n\tCASE \n\t\tWHEN MonthlyIncome < 3000 THEN 'Low Income'\n\t\tWHEN MonthlyIncome BETWEEN 3000 AND 7000 THEN 'Medium Income'\n\t\tELSE 'High Income'\n\tEND AS income_band,\n\n\tCASE\n\t\tWHEN DistanceFromHome <= 5 THEN 'Near'\n\t\tWHEN DistanceFromHome BETWEEN 6 AND 15 THEN 'Medium Distance'\n\t\tELSE 'Far'\n\tEND AS distance_band,\n\n\tCASE \n\t\tWHEN JobSatisfaction = 1 THEN 'Low'\n\t\tWHEN JobSatisfaction = 2 THEN 'Medium'\n\t\tWHEN JobSatisfaction = 3 THEN 'High'\n\t\tWHEN JobSatisfaction = 4 THEN 'Very High'\n\tEND AS satisfaction_level,\n\n\tCASE \n\t\tWHEN WorkLifeBalance = 1 THEN 'Bad'\n\t\tWHEN WorkLifeBalance = 2 THEN 'Good'\n\t\tWHEN WorkLifeBalance = 3 THEN 'Very Good'\n\t\tWHEN WorkLifeBalance = 4 THEN 'Best'\n\tEND AS worklifebalance_group,\n\t\n\tCASE \n\t\tWHEN YearsSinceLastPromotion = 0 THEN 'Promoted Recently'\n\t\tWHEN YearsSinceLastPromotion BETWEEN 1 AND 3 THEN '1-3 Years'\n\t\tWHEN YearsSinceLastPromotion BETWEEN 4 AND 7 THEN '4-7 Years'\n\t\tELSE '8+ Years'\n\tEND AS promotion_wait_band,\n\n\tCASE \n\t\tWHEN YearsAtCompany < 2 THEN '0-1 Years'\n\t\tWHEN YearsAtCompany BETWEEN 2 AND 5 THEN '2-5 Years'\n\t\tWHEN YearsAtCompany BETWEEN 6 AND 10 THEN '6-10 Years'\n\t\tELSE '10+ Years'\n\tEND AS tenure_band\nFROM hr_employee_attrition;",
  "missingQuery": "SELECT\n\tCOUNT(*) AS total_rows,\n\tCOUNT(*) FILTER (WHERE Attrition IS NULL) AS missing_attrition,\n\tCOUNT(*) FILTER (WHERE Age IS NULL) AS missing_age,\n\tCOUNT(*) FILTER (WHERE Department IS NULL) AS missing_department,\n\tCOUNT(*) FILTER (WHERE MonthlyIncome IS NULL) AS missing_income\nFROM hr_employee_attrition;",
  "duplicatesQuery": "SELECT EmployeeNumber, COUNT(*)\nFROM hr_employee_attrition\nGROUP BY EmployeeNumber\nHaving COUNT(*) > 1;",
  "findings": [
    {
      "title": "Overall attrition",
      "evidence": "237 of 1,470 employees · 16.12%",
      "interpretation": "Use this snapshot proportion as a baseline, not an annual turnover rate."
    },
    {
      "title": "Department differences",
      "evidence": "Sales 20.63%; HR 19.05%; R&D 13.84%",
      "interpretation": "Sales has the highest rate; R&D has the most leavers (133) and the largest workforce (961)."
    },
    {
      "title": "Job-role differences",
      "evidence": "Sales Representatives: 33 of 83 · 39.76%",
      "interpretation": "Investigate role conditions with interviews and workload reviews."
    },
    {
      "title": "Overtime association",
      "evidence": "Overtime 30.53%; no overtime 10.44%",
      "interpretation": "Review scheduling and staffing. The comparison does not establish causation."
    },
    {
      "title": "Income and age",
      "evidence": "Income below 3,000: 28.61%; age under 25: 39.18%",
      "interpretation": "Investigate progression and onboarding within comparable roles."
    },
    {
      "title": "Employee experience",
      "evidence": "Lowest job satisfaction: 22.84%; lowest work-life balance: 31.25%",
      "interpretation": "Use stay interviews and team-level discussion to understand the differences."
    },
    {
      "title": "Qualifying employee segment",
      "evidence": "Sales Representatives, overtime, low income: 14 of 20 · 70%",
      "interpretation": "Prioritise group-level investigation; this is not an individual resignation prediction."
    }
  ],
  "dax": "Total Employees =\nDISTINCTCOUNT(HR_Data[EmployeeNumber])\n\nTotal Leavers =\nCOALESCE(CALCULATE([Total Employees], HR_Data[Attrition] = \"Yes\"), 0)\n\nTotal Retained =\nCOALESCE(CALCULATE([Total Employees], HR_Data[Attrition] = \"No\"), 0)\n\nAttrition Rate =\nDIVIDE([Total Leavers], [Total Employees])\n\nRetention Rate =\nDIVIDE([Total Retained], [Total Employees])\n\nOverall Attrition Rate =\nCALCULATE([Attrition Rate], REMOVEFILTERS(HR_Data))\n\nRate Difference (pp) =\n100 * ([Attrition Rate] - [Overall Attrition Rate])\n\nAverage Monthly Income =\nAVERAGE(HR_Data[MonthlyIncome])\n\nAverage Age of Leavers =\nCALCULATE(AVERAGE(HR_Data[Age]), HR_Data[Attrition] = \"Yes\")\n\nAverage Distance of Leavers =\nCALCULATE(AVERAGE(HR_Data[DistanceFromHome]), HR_Data[Attrition] = \"Yes\")\n\nOvertime Attrition Rate =\nCALCULATE([Attrition Rate], HR_Data[OverTime] = \"Yes\")\n\nNo Overtime Attrition Rate =\nCALCULATE([Attrition Rate], HR_Data[OverTime] = \"No\")\n\nEligible Segment Rate =\nIF([Total Employees] >= 10, [Attrition Rate])\n\nHighest Attrition Department =\nVAR T = TOPN(1, ADDCOLUMNS(ALLSELECTED(HR_Data[Department]), \"Rate\", [Attrition Rate]), [Rate], DESC, HR_Data[Department], ASC) RETURN CONCATENATEX(T, HR_Data[Department], \", \")",
  "sourceHash": "f876acf185a41c7ade07f511a14ea5d89b3ff7172d85168dfd0ce592c9d6b4a9"
};
