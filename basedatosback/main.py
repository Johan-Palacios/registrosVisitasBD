import pyodbc
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

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

class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class Database:
    def __init__(self):
        self.conn: pyodbc.Connection
        self.cursor: pyodbc.Cursor
        self.conn_status = False

    def connect(self, USERNAME, PASSWORD):
        connection_string = (
            f"DRIVER={{ODBC Driver 18 for SQL Server}};"
            + f"SERVER={SERVER};"
            + f"DATABASE={DATABASE};"
            + f"UID={USERNAME};"
            + f"PWD={PASSWORD};"
            + f"TrustServerCertificate=Yes"
        )
        self.conn = pyodbc.connect(connection_string)
        self.cursor = self.conn.cursor()
        self.conn_status = True
    def get_conn_status(self):
        return self.conn_status

    def close(self):
        self.conn_status = False
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()

    def get_cursor(self) -> pyodbc.Cursor:
        return self.cursor

db = Database()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Genera un token JWT con datos de usuario y expiración opcional."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def is_token_valid(token: str) -> bool:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return False
        return True
    except JWTError:
        return False

@app.get("/check-connection", response_model=bool)
async def check_connection():
    conn_status = db.get_conn_status()
    return conn_status

@app.post("/login")
async def login(user: UserLogin):
    try:
        USERNAME = user.username
        PASSWORD = user.password

        db.connect(USERNAME, PASSWORD)

        print("conectado")

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": USERNAME}, expires_delta=access_token_expires
        )

        return {"access_token": access_token, "token_type": "bearer"}

    except pyodbc.InterfaceError:
        raise HTTPException(status_code=400, detail="Credenciales Invalidas")
    except Exception as _:
        raise HTTPException(status_code=500, detail="BD No conectada")


@app.get("/protected-route")
async def protected_route(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    if db.get_conn_status():
        cursor = db.get_cursor()
        print("No Entro")

    return {"message": "Acceso permitido"}
