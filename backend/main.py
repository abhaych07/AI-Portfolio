import json
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel, Field
from pypdf import PdfReader


# ==========================================
# ENVIRONMENT
# ==========================================

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing")

client = Groq(api_key=api_key)

model = "openai/gpt-oss-120b"


# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

RESUME_PATH = BASE_DIR / "Abhay_Resume_FS1.pdf"


# ==========================================
# PYDANTIC MODELS
# ==========================================

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = Field(default_factory=list)


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    total_experience_years: float | None = None

    skills: list[str] = Field(default_factory=list)
    experiences: list[Experience] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)


class ChatRequest(BaseModel):
    question: str


# ==========================================
# RESUME SCHEMA
# ==========================================

resume_schema = Resume.model_json_schema()


# ==========================================
# PDF READER
# ==========================================

def read_pdf(file_path: Path) -> str:

    if not file_path.exists():
        raise FileNotFoundError(
            f"Resume not found at: {file_path}"
        )

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


# ==========================================
# RESUME PARSER
# ==========================================

def parse_resume(resume_text: str) -> Resume:

    system_prompt = f"""
You are an expert resume parser.

Extract information from the resume based on its meaning,
not only based on exact section headings.

Different resumes may use different headings.

For example:

- Experience
- Professional Experience
- Work History
- Employment
- Internships

These may all contain relevant experience.

Skills may appear in:

- Skills section
- Experience
- Internships
- Projects
- Education

Return ONLY valid JSON matching this schema:

{json.dumps(resume_schema, indent=2)}

Important rules:

1. Do not invent information.
2. If a value is not available, return null.
3. If a list has no information, return an empty list.
4. Include internships inside experiences.
5. Extract skills mentioned across the entire resume.
"""

    user_prompt = f"""
Parse the following resume:

{resume_text}
"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        response_format={
            "type": "json_object"
        },
    )

    raw_output = response.choices[0].message.content

    data = json.loads(raw_output)

    return Resume(**data)


# ==========================================
# GLOBAL RESUME
# ==========================================

resume: Resume | None = None


# ==========================================
# STARTUP
# ==========================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    global resume

    print("Loading resume...")

    resume_text = read_pdf(RESUME_PATH)

    print("Parsing resume with Groq...")

    resume = parse_resume(resume_text)

    print("Resume loaded successfully.")

    yield

    print("Server shutting down.")


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="Abhay AI Portfolio API",
    lifespan=lifespan,
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        # Local development
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        # Deployed frontend
        "https://ai-portfolio-1-vgm2.onrender.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# AI INTERVIEWER
# ==========================================

def ask_candidate(
    question: str,
    candidate_resume: Resume,
) -> str:

    system_prompt = f"""
You are the AI assistant representing Abhay Kumar Chaudhary.

You answer questions from visitors about Abhay's
professional background.

Below is the complete structured information extracted
from his resume:

{candidate_resume.model_dump_json(indent=2)}

Rules:

1. Answer ONLY using the information provided above.

2. Never invent or hallucinate information.

3. If the information is not present, say:

"I don't have enough information to answer that."

4. Be professional and concise.

5. Speak about Abhay in the third person.

6. If a visitor asks about a technology, skill,
project, education, certification, or experience,
only mention it if it exists in the resume.

7. If a requested skill is not present in the resume,
clearly say that it is not listed in the resume.

8. Do not assume that Abhay knows a technology
just because it is related to another technology.

9. Do not make up job experience, internships,
companies, salaries, achievements, or certifications.

10. The resume is the source of truth.
"""

    response = client.chat.completions.create(
        model=model,

        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": question,
            },
        ],
    )

    return response.choices[0].message.content


# ==========================================
# ROUTES
# ==========================================

@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "message": "Abhay AI Portfolio backend is running",
    }


@app.get("/api/resume")
def get_resume():

    if resume is None:
        raise HTTPException(
            status_code=503,
            detail="Resume has not been loaded yet.",
        )

    return resume.model_dump()


@app.post("/api/chat")
def chat(request: ChatRequest):

    if resume is None:
        raise HTTPException(
            status_code=503,
            detail="Resume has not been loaded yet.",
        )

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    answer = ask_candidate(
        question,
        resume,
    )

    return {
        "answer": answer,
    }