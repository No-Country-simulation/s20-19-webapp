from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    is_blocked = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    publications = relationship('Publication', back_populates='user')

class Publication(Base):
    __tablename__ = 'publications'

    id = Column(String, primary_key=True)
    price = Column(Float, nullable=False)
    positive_points = Column(Integer, default=0)
    negative_points = Column(Integer, default=0)
    initial_date = Column(DateTime, nullable=False)
    final_date = Column(DateTime, nullable=True)
    comments = Column(String) 
    product = Column(String)  
    business = Column(String)  
    is_deleted = Column(Boolean, default=False)
    created_at = Column(String, nullable=False)
    user_id = Column(String, ForeignKey('users.id'))
    user = relationship('User', back_populates='publications')
    comments_relationship = relationship('Comment', back_populates='publication')

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    publication_id = Column(String, ForeignKey('publications.id'))
    comment = Column(String, nullable=False)
    user = relationship('User')
    publication = relationship('Publication', back_populates='comments_relationship')

class Product(Base):
    __tablename__ = 'products'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    type = Column(String, nullable=False)

class Shop(Base):
    __tablename__ = 'shops'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    location = Column(String, nullable=True)
    shop_locations = relationship('ShopLocation', back_populates='shop')

class Location(Base):
    __tablename__ = 'locations'

    id = Column(String, primary_key=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    shop = Column(String, nullable=True)
    shop_locations = relationship('ShopLocation', back_populates='location')

class ShopLocation(Base):
    __tablename__ = 'shops_locations'

    location_id = Column(String, ForeignKey('locations.id'), primary_key=True)
    shop_id = Column(String, ForeignKey('shops.id'), primary_key=True)
    shop = relationship('Shop', back_populates='shop_locations')
    location = relationship('Location', back_populates='shop_locations')