from pydantic import BaseModel

class PublicationOutput(BaseModel):
    id: int
    price: float
    positive_points: int
    negative_points: int
    '''
    initial_date: dat
    final_date: Column(DateTime, nullable=True)
    is_deleted: Column(Boolean, default=False)
    created_at: str
    user_id: int
    user: relationship('User', back_populates='publications')
    comments: relationship('Comment', back_populates='publication')
    #product_id: Column(String, ForeignKey('products.id'))
    shop_id: Column(Integer, ForeignKey('shops.id'))
    shops: relationship('Shop', back_populates='publications')
    '''