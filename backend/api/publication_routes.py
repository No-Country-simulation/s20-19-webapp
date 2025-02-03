from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schema.publication_input import PublicationInput
from schema.publication_output import PublicationOutput
from api.publication_service import ProductService

from utils.config import get_db

#from schema.product_input import ProductInput
#from schema.product_output import ProductOutput
#from api.product_service import ProductService


router = APIRouter(
    prefix='/publication',
    tags=['publication']
)

@router.post('', status_code=201, response_model=PublicationOutput)
def create_product(data: PublicationInput, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.create(data)

@router.get('', status_code=200, response_model=List[Optional[PublicationOutput]])
def get_all_products(session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.get_all()

@router.delete('/{product_id}', status_code=204)
def delete_product(product_id: str, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.delete(product_id)

@router.put('/{product_id}', status_code=200, response_model=PublicationOutput)
def update_product(product_id: str, data: PublicationInput, session: Session = Depends(get_db)):
    _service = ProductService(session)
    return _service.update(product_id, data)