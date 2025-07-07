from fastapi import FastAPI
from api.video import URIRoute
from fastapi.middleware.cors import CORSMiddleware
from setup import Setup
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app):
    Setup().start()  # This runs at startup
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(URIRoute())
