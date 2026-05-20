from sqlalchemy import Column, Integer, String, Float

from app.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    description = Column(String)
    image_url = Column(String)

    latitude = Column(Float)
    longitude = Column(Float)

    status = Column(String, default="pending")

    user_id = Column(Integer)