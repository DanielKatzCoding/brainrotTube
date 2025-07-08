from pydantic import BaseModel

class Comment(BaseModel):
    index: int
    offset: int
    size: int
