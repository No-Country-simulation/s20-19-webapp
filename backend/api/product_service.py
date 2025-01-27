from typing import List, Optional
from sqlalchemy.orm import Session
from repository.product_repository import ProductRepository
from schema.product_input import ProductInput
from schema.product_output import ProductOutput
from utils.exception.exception import EntityAlreadyExistsError, EntityDoesNotExistError

class ProductService():
    def __init__(self, session: Session):
        self.repository = ProductRepository(session)
    
    #create
    def create(self, data: ProductInput) -> ProductOutput:
        if self.repository.exists_by_name_and_brand(data.name, data.brand):
            raise EntityAlreadyExistsError("This product already exists")
        return self.repository.create(data)

    #get all
    def get_all(self) -> List[Optional[ProductOutput]]:
        return self.repository.get_all()

    #delete
    def delete(self, id: str) -> bool:
        product_entity = self.repository.get_by_id(id)
        if product_entity is None:
            raise EntityDoesNotExistError("This product does not exists")
        return self.repository.delete(product_entity)

    #update
    def update(self, id: str, product: ProductInput) -> ProductOutput:
        product_entity = self.repository.get_by_id(id)
        if product_entity is None:
            raise EntityDoesNotExistError("This product does not exists")
        return self.repository.update(product_entity, product)
