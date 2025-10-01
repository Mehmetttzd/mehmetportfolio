from fastapi import APIRouter

router = APIRouter(prefix="/skills", tags=["Skills"])

# Structured skill data
skills_data = [
    {
        "category": "Programming Languages",
        "strength": 85,
        "tools": [
            {"name": "Python", "level": 90},
            {"name": "TypeScript", "level": 75},
            {"name": "JavaScript", "level": 70},
            {"name": "SQL", "level": 80},
        ],
    },
    {
        "category": "AI & Machine Learning",
        "strength": 90,
        "tools": [
            {"name": "LlamaIndex", "level": 80},
            {"name": "LangChain", "level": 70},
            {"name": "Transformers", "level": 75},
            {"name": "Vector Databases", "level": 70},
            {"name": "OpenAI / Ollama APIs", "level": 85},
            {"name": "TensorFlow", "level": 65},
            {"name": "scikit-learn", "level": 75},
        ],
    },
    {
        "category": "Backend & APIs",
        "strength": 80,
        "tools": [
            {"name": "FastAPI", "level": 85},
            {"name": "Node.js", "level": 70},
            {"name": "REST APIs", "level": 75},
            {"name": "GraphQL", "level": 65},
        ],
    },
    {
        "category": "Cloud & Infrastructure",
        "strength": 75,
        "tools": [
            {"name": "AWS", "level": 80},
            {"name": "Docker", "level": 75},
            {"name": "Kubernetes", "level": 70},
            {"name": "Linux/Unix CLI", "level": 65},
        ],
    },
    {
        "category": "Data Engineering",
        "strength": 70,
        "tools": [
            {"name": "Pandas", "level": 85},
            {"name": "Airflow", "level": 70},
            {"name": "ETL Pipelines", "level": 75},
            {"name": "SQL Server", "level": 80},
            {"name": "PostgreSQL", "level": 75},
            {"name": "MongoDB", "level": 65},
        ],
    },
    {
        "category": "QA & Testing",
        "strength": 65,
        "tools": [
            {"name": "Selenium", "level": 70},
            {"name": "Cypress", "level": 65},
            {"name": "Postman", "level": 80},
            {"name": "PyTest", "level": 75},
        ],
    },
    {
        "category": "DevOps & Tools",
        "strength": 75,
        "tools": [
            {"name": "Git & GitHub", "level": 85},
            {"name": "CI/CD (GitHub Actions)", "level": 75},
            {"name": "Agile / Scrum", "level": 70},
            {"name": "Jira", "level": 65},
        ],
    },
]

@router.get("/")
def list_skills():
    return skills_data
