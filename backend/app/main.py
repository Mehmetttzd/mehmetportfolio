from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import projects, experience, skills, contact, chat  # ✅ added chat

app = FastAPI(
    title="Mehmet Portfolio Backend",
    description="Backend API powering the portfolio site",
    version="0.3.0"
)

# ✅ Enable CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev: allow all, later restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

# ✅ Register routers
app.include_router(projects.router)
app.include_router(experience.router)
app.include_router(skills.router)
app.include_router(contact.router)
app.include_router(chat.router)  # ✅ now works
