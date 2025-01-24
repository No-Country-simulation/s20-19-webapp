from fastapi import FastAPI
import uvicorn
from utils.config import Base, engine, SessionLocal
from model import comment, location, product, publication, shop, shop_location, user

app = FastAPI()

Base.metadata.create_all(bind=engine, checkfirst=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)