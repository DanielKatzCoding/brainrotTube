from pydantic import BaseModel


class Pagination(BaseModel):
    size: int
    offset: int
