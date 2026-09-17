from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "McKinsey AI Hackathon backend is running!"
    }

@app.get("/health")
def health():
    return {
        "status": "ok"
    }
