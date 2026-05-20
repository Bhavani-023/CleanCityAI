from pydantic import BaseModel

class ComplaintCreate(BaseModel):
    description: str
    image_url: str
    latitude: float
    longitude: float