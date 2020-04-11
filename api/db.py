from typing import Optional

from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./data.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Branch(BaseModel):
    node_from: int
    node_to: int
    flow: float

    class Config:
        orm_mode = True


class Node(BaseModel):
    node_id: int
    node_type: int
    demand: float
    generation: Optional[float]
    cost: Optional[float]

    class Config:
        orm_mode = True
