from sqlalchemy.orm import Session
from schema.product_input import ProductInput
from schema.product_output import ProductOutput
from model.product import Product
from typing import List, Optional, Type

class ProductRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def create(self, data: ProductInput) -> ProductOutput:
        product = Product(**data.model_dump(exclude_none=True))
        self.session.add(product)
        self.session.commit()
        self.session.refresh(product)
        return ProductOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    
    def get_all(self) -> List[Optional[ProductOutput]]:
        products = self.session.query(Product).all()
        return [ProductOutput(id=product.id, name=product.name, brand=product.brand, type=product.type) for product in products]
    
    def get_by_id(self, id: str) -> ProductOutput:
        product = self.session.query(Product).filter(Product.id==id).first()
        return ProductOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    
    def update(self, product: Type[Product], data: ProductInput) -> ProductInput:
        product.name = data.name
        product.brand = data.brand
        product.type = data.type
        self.session.commit()
        self.session.flush()
        return ProductOutput(id=product.id, name=product.name, brand=product.brand, type=product.type)
    

    def delete(self, product: Type[Product]) -> bool:
        self.session.delete(product)
        self.session.commit()
        return True
    
    def exists_by_name_and_brand(self, model_name: str, model_brand: str) -> bool:
        return self.session.query(Product).filter(Product.name==model_name, Product.brand==model_brand).first() is not None