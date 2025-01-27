from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema.product_input import ProductInput
from schema.product_output import ProductOutput
from api.product_service import ProductService
from utils.config import get_db

router = APIRouter(
    prefix='/product',
    tags=['product']
)

@router.post('', status_code=201, response_model=ProductOutput)
def create_product(data: ProductInput, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.create(data)

@router.get('', status_code=200, response_model=List[Optional[ProductOutput]])
def get_all_products(session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.get_all()

@router.delete('/{product_id}', status_code=204)
def delete_product(product_id: str, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.delete(product_id)

@router.put('/{product_id}', status_code=200, response_model=ProductOutput)
def update_product(product_id: str, data: ProductInput, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.update(product_id, data)