import pyodbc
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVER = "localhost"
DATABASE = "master"
cursor = None
conn = None


class UserLogin(BaseModel):
    username: str
    password: str


@app.post("/login")
async def login(user: UserLogin):
    try:
        USERNAME = user.username
        PASSWORD = user.password

        connectionString = (
            f"DRIVER={{ODBC Driver 18 for SQL Server}};"
            + f"SERVER={SERVER};"
            + f"DATABASE={DATABASE};"
            + f"UID={USERNAME};"
            + f"PWD={PASSWORD};"
            + f"TrustServerCertificate=Yes"
        )
        conn = pyodbc.connect(connectionString)
        cursor = conn.cursor()
        print("conectado")

    except pyodbc.InterfaceError:
        raise HTTPException(status_code=400, detail="Credenciales Invalidas")
    except Exception as _:
        raise HTTPException(status_code=500, detail="BD No conectada")


