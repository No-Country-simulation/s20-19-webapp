from fastapi import APIRouter, FastAPI
import uvicorn
from api import product_routes
from utils.config import Base, engine
from model import comment, location, product, publication, shop, shop_location, user
from utils.router import router

app = FastAPI()

Base.metadata.create_all(bind=engine, checkfirst=True)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)