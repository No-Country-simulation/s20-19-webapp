from sqlalchemy import Column, String, Integer
from utils.config import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    type = Column(String, nullable=False)
    #publication: List[Optional[Publication]] = relationship('Publication', back_populates='products', nullable=True)