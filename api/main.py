from typing import List

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from db import get_db, Branch, Node

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/branches/{hour}", response_model=List[Branch])
async def get_branches(hour: int, db: Session = Depends(get_db)):
    return db.execute(
        "SELECT * FROM branches WHERE hour=:hour", {"hour": hour}
    ).fetchall()


@app.get("/nodes/{hour}", response_model=List[Node])
async def get_nodes(hour: int, db: Session = Depends(get_db)):
    return db.execute("SELECT * FROM nodes WHERE hour=:hour", {"hour": hour}).fetchall()
