from fastapi import APIRouter

router = APIRouter(prefix="/projects", tags=["Projects"])

projects_data = [
    {
        "id": 1,
        "name": "Expense Genie",
        "description": "OCR-powered receipt & expense manager",
        "details": "Built a full-stack app with FastAPI + Node.js + MongoDB. Integrated OCR with Tesseract for parsing receipts, deployed on AWS using Docker. Improved efficiency by automating expense tracking for users.",
        "impact": "Reduced manual data entry by 80%, handling 5K+ receipts monthly.",
        "status": "Completed",
        "tech": {
            "frontend": ["React", "Tailwind"],
            "backend": ["Python", "FastAPI", "Node.js"],
            "ml": ["OCR", "Pandas"],
            "cloud": ["AWS", "Docker"]
        }
    },
    {
        "id": 2,
        "name": "Zoning Chatbot",
        "description": "AI chatbot for querying zoning laws",
        "details": "Developed a retrieval-augmented chatbot using LlamaIndex + vector databases. Allows users to ask natural-language queries on zoning PDFs and get reliable answers.",
        "impact": "Cut research time from hours to seconds, tested on 67 pages of zoning data.",
        "status": "Completed",
        "tech": {
            "frontend": ["Next.js"],
            "backend": ["FastAPI"],
            "ml": ["LlamaIndex", "Ollama Embeddings"],
            "cloud": ["Local Deployment", "Docker"]
        }
    },
    {
        "id": 3,
        "name": "Cafe RAG Bot",
        "description": "AI assistant for menu queries",
        "details": "Lightweight production-shaped RAG project. Converts CSV café menu into a chatbot that answers questions locally using Ollama models.",
        "impact": "Showcased how local-first AI can replace cloud solutions in small businesses.",
        "status": "In Progress",
        "tech": {
            "frontend": ["React"],
            "backend": ["FastAPI"],
            "ml": ["Ollama LLM", "Embeddings"],
            "cloud": []
        }
    }
]

@router.get("/")
def list_projects():
    return {"projects": projects_data}
