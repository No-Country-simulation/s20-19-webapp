from fastapi import APIRouter
from api import product_routes, publication_routes


router = APIRouter(
    prefix='/api/v1'
)

router.include_router(product_routes.router)
router.include_router(publication_routes.router)

__all__ = ['router']