from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
    Settings,
)
from llama_index.llms.openai_like import OpenAILike   # ✅ correct for OpenRouter
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# --- Load env ---
load_dotenv()

router = APIRouter(prefix="/chat", tags=["Chat"])

# --- Pydantic models ---
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

# --- Settings ---
Settings.llm = OpenAILike(
    model=os.getenv("OPENROUTER_MODEL", "gpt-4o-mini"),
    api_key=os.getenv("OPENROUTER_API_KEY"),
    api_base="https://openrouter.ai/api/v1"   # ✅ OpenRouter endpoint
)

Settings.embed_model = HuggingFaceEmbedding(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

DATA_DIR = os.path.join(os.getcwd(), "data")
PERSIST_DIR = os.path.join(os.getcwd(), "storage")

_index = None

def get_or_build_index():
    global _index
    if _index:
        return _index

    os.makedirs(PERSIST_DIR, exist_ok=True)

    if os.path.exists(os.path.join(PERSIST_DIR, "docstore.json")):
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        _index = load_index_from_storage(storage_context)
        return _index

    reader = SimpleDirectoryReader(DATA_DIR, recursive=True, required_exts=[".md", ".txt", ".pdf", ".docx"])
    docs = reader.load_data()
    if not docs:
        raise RuntimeError(f"No documents found in {DATA_DIR}. Put your resume or project summaries there.")

    _index = VectorStoreIndex.from_documents(docs)
    _index.storage_context.persist(persist_dir=PERSIST_DIR)
    return _index

# --- Routes ---
@router.post("/", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        index = get_or_build_index()
        qe = index.as_query_engine(similarity_top_k=4)
        response = qe.query(req.question)
        return ChatResponse(answer=response.response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
