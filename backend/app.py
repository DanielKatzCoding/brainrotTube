from fastapi import FastAPI
from api.uri_routes import URIRoutes
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(URIRoutes())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
