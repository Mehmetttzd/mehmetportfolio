from fastapi import APIRouter

router = APIRouter(prefix="/experience", tags=["Experience"])

experience_data = [
    {
        "role": "AI & ML Platform Engineer",
        "company": "DevFortress",
        "location": "Canada",
        "years": "2024–2025",
        "summary": [
            "Developed and maintained enterprise APIs with Python & FastAPI ensuring 99.9% uptime.",
            "Led CI/CD improvements with GitHub Actions and Kubernetes, reducing deployment time by 30%.",
            "Collaborated in Agile teams with developers, QA, and analysts."
        ],
        "impact": "Reduced API response latency by 40% across production systems.",
        "tools": ["Python", "FastAPI", "AWS", "Kubernetes", "GitHub Actions", "Agile"]
    },
    {
        "role": "Junior Data Engineer",
        "company": "Freelance Contract",
        "location": "Canada",
        "years": "2023–2024",
        "summary": [
            "Designed ETL pipelines with Python & SQL for automated reporting.",
            "Built data workflows using Airflow & Pandas, cutting processing time by 50%."
        ],
        "impact": "Automated reporting saved clients ~10 hours monthly.",
        "tools": ["Python", "SQL", "Airflow", "Pandas"]
    },
    {
        "role": "Software Developer Intern",
        "company": "LaSalle College",
        "location": "Canada",
        "years": "2022",
        "summary": [
            "Built and tested ML/NLP prototypes with TensorFlow & scikit-learn.",
            "Integrated OCR + NLP into chatbot applications.",
            "Presented results clearly to both technical and non-technical audiences."
        ],
        "impact": "Contributed to academic showcase with NLP chatbot prototype.",
        "tools": ["TensorFlow", "scikit-learn", "OCR", "NLP"]
    },
    {
        "role": "Freelance Web Developer",
        "company": "Self-Employed",
        "location": "Canada",
        "years": "2021–2022",
        "summary": [
            "Delivered small-scale web applications with JavaScript, PHP, and SQL.",
            "Improved performance via debugging and troubleshooting.",
            "Collaborated with clients using Agile-style delivery cycles."
        ],
        "impact": "Successfully deployed 4+ client web projects.",
        "tools": ["JavaScript", "PHP", "SQL", "Agile"]
    }
]

@router.get("/")
def list_experience():
    return {"experience": experience_data}
