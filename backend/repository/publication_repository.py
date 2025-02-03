from sqlalchemy.orm import Session
from schema.publication_input import PublicationInput
from schema.publication_output import PublicationOutput
from model.publication import Publication

from typing import List, Optional, Type

class PublicationRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def create(self, data: PublicationInput) -> PublicationOutput:
        product = Publication(**data.model_dump(exclude_none=True))
        self.session.add(product)
        self.session.commit()
        self.session.refresh(product)
        return PublicationOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    
    def get_all(self) -> List[Optional[PublicationOutput]]:
        products = self.session.query(Publication).all()
        return [PublicationOutput(id=product.id, name=product.name, brand=product.brand, type=product.type) for product in products]
    
    def get_by_id(self, id: str) -> PublicationOutput:
        product = self.session.query(Publication).filter(Publication.id==id).first()
        return PublicationOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    
    '''
    def update(self, product: Type[Product], data: ProductInput) -> ProductInput:
        product.name = data.name
        product.brand = data.brand
        product.type = data.type
        self.session.commit()
        self.session.flush()
        return ProductOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    '''
    '''
    def delete(self, product: Type[Product]) -> bool:
        self.session.delete(product)
        self.session.commit()
        return True
    '''
    '''
    def exists_by_name_and_brand(self, model_name: str, model_brand: str) -> bool:
        return self.session.query(Product).filter(Product.name==model_name, Product.brand==model_brand).first() is not None
    '''