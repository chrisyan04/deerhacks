from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Record

router = APIRouter()

@router.get("/{id}", response_description="Get a single record by id", response_model=Record)
def find_record(id: str, request: Request):
    if (record := request.app.database["records"].find_one({"public_id": id})) is not None:
        return record
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with ID {id} not found")