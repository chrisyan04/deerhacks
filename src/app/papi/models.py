import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Record(BaseModel):
    public_id: str = Field(...)
    secure_url: str = Field(...)
    email: str = Field(...)
    title: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "public_id": "someID",
                "secure_url": "huhURL",
                "email": "some@email",
                "title": "Don Quixote"
            }
        }