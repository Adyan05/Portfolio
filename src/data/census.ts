import type { Project } from './projects';
export const census: Project = {
  "id": "census-demographic",
  "title": "Census Demographic Analysis",
  "subtitle": "University assignment · Python data cleaning & exploration",
  "category": "Data Analytics",
  "description": "I used Python to clean and explore 10,601 census records, turning inconsistent fields and missing values into household features, demographic summaries and a population pyramid.",
  "accent": "sand",
  "cover": "images/census/population-pyramid.png",
  "technologies": [
    "Python",
    "pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn"
  ],
  "repository": "https://github.com/Adyan05/Census-Demographic-Analysis",
  "metadata": [
    {
      "label": "Context",
      "value": "University assignment"
    },
    {
      "label": "Dataset",
      "value": "10,601 records · 12 original columns"
    },
    {
      "label": "Outcome",
      "value": "Cleaned working dataset & demographic analysis"
    }
  ],
  "slides": [
    {
      "id": "overview",
      "kind": "overview",
      "title": "Learning to turn messy data into analysis",
      "body": "This university assignment took me through an end-to-end workflow in a Jupyter notebook: inspect a raw census CSV, clean its fields, engineer useful features and communicate the population structure.",
      "workflow": [
        "Inspect data types, missing values and unique categories",
        "Standardise names, numeric values and categories",
        "Apply and inspect rule-based missing-value treatments",
        "Create household, employment and age-group features",
        "Summarise distributions and visualise the population"
      ],
      "cards": [
        {
          "title": "What I learned",
          "text": "Data preparation requires both Python skills and decisions about what missing or inconsistent values mean."
        },
        {
          "title": "Final deliverable",
          "text": "A notebook containing the cleaned working DataFrame, frequency tables, household occupancy analysis and demographic charts."
        }
      ]
    },
    {
      "id": "audit",
      "kind": "problem",
      "title": "Start by understanding data quality",
      "body": "I learned to inspect the data before changing it. The saved notebook reports 760 missing household relationships, 2,501 missing marital statuses, 10,512 missing infirmity values and 6,162 missing religions. Whitespace-only values required separate checks.",
      "code": "#Rename Unnamed to Num\ndf1 = df1.rename(columns={'Unnamed: 0': 'Num'})\nprint(df.isna().sum())\n\n#Clean column names\ndf1.columns = df1.columns.str.strip().str.replace(\" \", \"_\").str.lower()\n# df1['house_number'] = df1['house_number'].astype(int)\n# df1['age'] = df1['age'].astype(int)\ndf1['occupation'] = df1['occupation'].astype('category')\ndf1['marital_status'] = df1['marital_status'].astype('category')\ndf1['gender'] = df1['gender'].astype('category')\ndf1['infirmity'] = df1['infirmity'].astype('category')\n\nprint(df1.info())",
      "caption": "Original notebook excerpts: missing-value audit and column/type standardisation. Cell numbers in the evidence notes are zero-based."
    },
    {
      "id": "numeric-cleaning",
      "kind": "features",
      "title": "Make inconsistent values usable",
      "body": "I converted the house number “Nine” to 9 and wrote a function to handle ages such as “Three” and decimal strings. A boxplot exposed extreme ages, including 126 and 134; the assignment then capped ages above 110.",
      "code": "#Checking house number, make sure number\nprint(df1['house_number'].unique())\ndf1['house_number'] = df1['house_number'].replace('Nine', 9)\ndf1['house_number'] = df1['house_number'].astype(int)\n\n# print(df1['age'].unique())\n# print(df1['age'].info())\n\ndef clean_age(x):\n    # 1. Replace the word \"Three\" with 3\n    if x == \"Three\":\n        return 3\n    \n    # 2. If x is a float, convert to int\n    if isinstance(x, float):\n        return int(x)\n    \n    # 3. If x is a numeric string that looks like a float (\"54.76\")\n    #So basically it checks if 54.76 is a digit, so based on this (54.76, it is not a digit)\n    #Removing the . makes it 5476, which is a digit, then it returns the int of the float\n    if isinstance(x, str) and x.replace('.', '', 1).isdigit():\n        return int(float(x))\n    \n    return x\n\n# Apply to dataframe\ndf1['age'] = df1['age'].apply(clean_age)\nprint(df1['age'].unique())\nprint(df1['age'].isna().sum())\nprint(df1['age'].dtype)\n\ndf1.loc[df1['age'] > 110, 'age'] = 110\nprint(df1['age'].unique())",
      "gallery": [
        {
          "title": "Inspecting age outliers",
          "image": "images/census/age-boxplot.png",
          "caption": "Original saved notebook output before age capping. A cap is an analysis assumption, not confirmation of the true age."
        }
      ],
      "caption": "What I learned: combine unique-value checks, explicit conversion rules and visual inspection rather than assuming a column is already numeric."
    },
    {
      "id": "missing-values",
      "kind": "features",
      "title": "Use group context to handle missing values",
      "body": "I used groupby and transform to fill missing religion from the first recorded value within a family, then filled remaining gaps with “none”. The saved output reduces religion NaNs from 6,162 to zero.",
      "code": "# For each family_id, take the first non-missing religion and use it to fill missing ones\ndf1['religion'] = df1.groupby('family_id')['religion'].transform(\n    lambda x: x.fillna(x.dropna().iloc[0]) if x.dropna().size > 0 else x\n)\ndf1['religion']=df1['religion'].fillna('none')\nprint(df1['religion'].value_counts())\nprint(\"Empty religion field: \" ,df1['religion'].isna().sum())",
      "cards": [
        {
          "title": "Python skill",
          "text": "Group-level transformations let me use related rows while preserving the original row structure."
        },
        {
          "title": "What I learned",
          "text": "Completeness is not the same as accuracy. Relatives may have different beliefs, and missing religion or infirmity should not automatically mean “none”. These rules affect the reported distributions."
        }
      ]
    },
    {
      "id": "feature-engineering",
      "kind": "architecture",
      "title": "Create features that answer questions",
      "body": "I combined house number and street into a household identifier, added surname for a family identifier, and counted residents per household. I also grouped occupations and binned ages into five-year bands.",
      "code": "# 2. Create house_id\ndf1['house_id'] = df1['house_number'].astype(str) + \"_\" + df1['street']\n\n# Family ID = house_id + surname\ndf1['family_id'] = df1['house_id'] + \"_\" + df1['surname']\n\n#Create Occupancy, check how many in the house\ndf1['occupancy'] = df1.groupby('house_id')['house_id'].transform('count')",
      "cards": [
        {
          "title": "Household analysis",
          "text": "The saved notebook identifies a maximum recorded occupancy of 21 at 11_Chelmsford Lodge."
        },
        {
          "title": "What I learned",
          "text": "Good grouping keys matter: a house number alone is not unique across streets, and a shared surname is only a proxy for a family."
        }
      ]
    },
    {
      "id": "population",
      "kind": "screenshots",
      "title": "Final outcome: a population pyramid",
      "body": "I used pandas age bands and Matplotlib horizontal bars to compare recorded male and female counts across five-year age groups.",
      "image": "images/census/population-pyramid.png",
      "imageAlt": "Original notebook population pyramid showing recorded male and female counts by five-year age band",
      "caption": "Extracted directly from the saved notebook output, not recreated. What I learned: order age bands explicitly and use a shared axis to make demographic comparisons readable. The band construction excludes an age equal to the final right-hand edge (110), so that boundary needs correction in a future revision."
    },
    {
      "id": "results",
      "kind": "results",
      "title": "Final outcome: interpretable demographic summaries",
      "body": "The saved employment table classifies 5,688 records as employed (53.66%), 2,664 as Student (Child) (25.13%), 917 as retired (8.65%), 669 as students (6.31%) and 663 as unemployed (6.25%). These percentages describe all 10,601 records, rather than a labour-force unemployment rate.",
      "code": "counts = df1['employment_category'].value_counts()\ntotal = counts.sum()\nfreq = (counts / total * 100).round(2)\n\nemployment_table = pd.DataFrame({\n    'Employment Category': counts.index,\n    'Count': counts.values,\n    'Frequency (%)': freq.values\n})\n\nemployment_table",
      "cards": [
        {
          "title": "What I can now do",
          "text": "Audit CSV data, clean types and categories, apply conditional rules, create grouped features, calculate frequency tables and explain charts using Python."
        },
        {
          "title": "Interpret results carefully",
          "text": "The assignment labels everyone aged 18 or below as Student (Child). It also estimates births from age-zero counts and deaths from differences between older age bands; these are proxies, not verified annual vital statistics."
        },
        {
          "title": "What I would improve next",
          "text": "Preserve unknown categories, flag imputed values, validate manual edits, test age-bin boundaries and check that rule conditions use the same category casing as the cleaned data."
        }
      ]
    },
    {
      "id": "source",
      "kind": "repository",
      "title": "Explore the original assignment",
      "body": "The evidence shown here comes from the repository notebook and its saved outputs. The university assignment is presented as a learning project, with its assumptions and areas for improvement made explicit.",
      "links": [
        {
          "label": "Read the Jupyter notebook",
          "url": "https://github.com/Adyan05/Census-Demographic-Analysis/blob/main/CensusDemographicAnalysis.ipynb"
        },
        {
          "label": "Evidence notes",
          "url": "census/evidence.txt"
        }
      ]
    }
  ]
};
