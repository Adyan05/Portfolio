import type { Project } from './projects';
export const hr: Project = {
  "id": "hr-analytics",
  "title": "HR Employee Attrition Analytics | SQL & Power BI",
  "category": "Data Analytics",
  "description": "Employee attrition analysis using PostgreSQL, Python and Power BI: original SQL, three report pages and verified workforce findings.",
  "accent": "sage",
  "cover": "images/hr/powerbi/01-overview.png",
  "technologies": [
    "PostgreSQL",
    "Python",
    "pandas",
    "Matplotlib",
    "Power BI",
    "DAX"
  ],
  "slides": [
    {
      "id": "overview",
      "kind": "overview",
      "title": "HR Employee Attrition",
      "body": "An analysis of 1,470 employees in the fictional IBM HR dataset. PostgreSQL and Python support the analysis; Power BI presents workforce KPIs, associated factors and employee-group comparisons. The Power BI model imports the CSV directly.",
      "cards": [
        {
          "title": "1,470 employees",
          "text": "Unique employee records in the supplied snapshot."
        },
        {
          "title": "237 leavers",
          "text": "1,233 employees are marked as retained."
        },
        {
          "title": "16.12% attrition",
          "text": "Observed proportion in the dataset, not an annual turnover rate."
        }
      ]
    },
    {
      "id": "questions",
      "kind": "objectives",
      "title": "Business questions",
      "bullets": [
        "Which departments and job roles have higher observed attrition?",
        "How do overtime, income, age, distance, satisfaction and work-life balance relate to attrition?",
        "Do years since promotion show a consistent pattern?",
        "Which sufficiently large employee groups warrant further HR investigation?"
      ]
    },
    {
      "id": "method",
      "kind": "architecture",
      "title": "From data checks to reporting",
      "workflow": [
        "Check employee identifiers, missing values and attrition labels.",
        "Use PostgreSQL queries and CASE expressions to compare employee groups.",
        "Explore patterns in Python and Jupyter, with pandas and Matplotlib.",
        "Build Power BI measures and organise findings into three report pages."
      ],
      "body": "Counts and percentages are shown together. Segment rankings require at least 10 employees. Comparisons use the fixed full-dataset attrition rate as a baseline."
    },
    {
      "id": "powerbi",
      "kind": "features",
      "title": "Three Power BI report pages",
      "cards": [
        {
          "title": "Attrition Overview",
          "text": "Employee counts, attrition and retention rates, department and job-role comparisons."
        },
        {
          "title": "Attrition Factors",
          "text": "Overtime, income, age, distance, satisfaction, work-life balance and promotion-wait comparisons."
        },
        {
          "title": "Employee Segments & HR Actions",
          "text": "Segment matrix, qualifying-group ranking, population-versus-rate chart and HR investigation priorities."
        }
      ],
      "body": "The populated report opens in Power BI Desktop. Core counts and rates have been checked. Final checks of reset buttons, synchronized slicers and conditional formatting remain outstanding. The following images are Python analysis charts, not Power BI screenshots.",
      "links": [
        {
          "label": "Download Power BI report",
          "url": "downloads/hr/HR-Attrition-Report.pbix"
        },
        {
          "label": "DAX measures",
          "url": "downloads/hr/Measures.dax"
        },
        {
          "label": "Report validation notes",
          "url": "downloads/hr/BUILD_STATUS.md"
        }
      ]
    },
    {
      "id": "findings",
      "kind": "results",
      "title": "Findings and proposed HR actions",
      "cards": [
        {
          "title": "Overtime: 30.53% vs 10.44%",
          "text": "Review staffing and scheduling to investigate workload differences; this comparison does not prove overtime causes attrition."
        },
        {
          "title": "Sales: 20.63%",
          "text": "Sales has the highest department rate. Research & Development has more leavers in absolute terms because its workforce is larger."
        },
        {
          "title": "Group size matters",
          "text": "The leading qualifying segment has 20 employees and 14 leavers (70%). Use group-level findings to prioritise investigation, not to score individuals."
        }
      ],
      "body": "These are proposed actions, not measured retention improvements. The snapshot contains no event dates, and its associations do not establish causation."
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
    },
    {
      "id": "learning",
      "kind": "results",
      "title": "What I learned",
      "bullets": [
        "Translate business questions into grouped SQL comparisons.",
        "Use Python to explore the same questions and communicate patterns.",
        "Define DAX measures with explicit denominators and filter context.",
        "Distinguish high rates from high counts and account for small groups.",
        "Separate observed associations from causal claims and recommendations."
      ],
      "links": [
        {
          "label": "Explore project source",
          "url": "https://github.com/Adyan05/HR-Attrition"
        }
      ]
    }
  ],
  "repository": "https://github.com/Adyan05/HR-Attrition",
  "cardAction": "Explore case study"
};
