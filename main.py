import sys
import os
import fastapi
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from ai_engine import models
    from ai_engine import generator
    from ai_engine.models import GenerationRequest, Layout
    from ai_engine.generator import generate_layout_variants
except (ImportError, ValueError, SystemError):
    import models
    import generator
    from models import GenerationRequest, Layout
    from generator import generate_layout_variants

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "IntelliPlan AI Engine is running"}

@app.post("/generate-layout")
def generate_layout(request: GenerationRequest):
    variants = generate_layout_variants(request)
    return {
        "status": "success",
        "data": {
            "variants": variants,
            "message": f"Generated {len(variants)} layouts based on input"
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
