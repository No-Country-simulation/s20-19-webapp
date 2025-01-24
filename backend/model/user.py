from typing import List
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
from utils.config import Base

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
    comments = relationship('Comment', back_populates='user')