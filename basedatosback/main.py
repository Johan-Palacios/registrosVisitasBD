import pyodbc
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
from datetime import date, time

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
DATABASE = "registros"


class Visitante(BaseModel):
    dpi: int
    nombre: str
    apellido: str
    telefono: str
    direccion: str


class Funcionario(BaseModel):
    dpi: int
    nombre: str
    apellido: str
    idEdificio: int
    idOficina: int


class Visita(BaseModel):
    idVisitante: int
    fecha: date
    hora: time


class TramiteVisita(BaseModel):
    idVisitante: int
    idTramite: int
    fecha: date


class Oficina(BaseModel):
    numeroOficina: int
    idEdificio: int
    oficina: str


class Edificioid(BaseModel):
    idEdificio: int


class VisitanteDPI(BaseModel):
    visitanteDPI: str


class Edificio(BaseModel):
    edificio: str


class Tramite(BaseModel):
    tramite: str


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

    def get_conn(self):
        return self.conn

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


def fetch_data_from_stored_procedure(sp_name: str, params: list = []):
    if db.get_conn_status():
        try:
            cursor = db.get_cursor()

            placeholders = ", ".join(["?" for _ in params])
            query = f"EXEC {sp_name} {placeholders}"

            cursor.execute(query, params)

            columns = [column[0] for column in cursor.description]

            results = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return results

        except Exception as e:
            return {"error": str(e)}


def execute_stored_procedure(sp_name: str, params: list):
    if db.get_conn_status():
        try:
            cursor = db.get_cursor()
            conn = db.get_conn()

            placeholders = ", ".join(["?" for _ in params])
            query = f"EXEC {sp_name} {placeholders}"

            cursor.execute(query, params)
            conn.commit()
            return {"message": "Exitoso"}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.get("/visitantes")
async def get_Visitantes(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    sp_name = "Ver_Visitantes"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.get("/edificios")
async def get_Edificios(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    sp_name = "Ver_Edificios"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.get("/tramites")
async def get_tramites(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    sp_name = "Ver_Tramites"
    data = fetch_data_from_stored_procedure(sp_name)

    return data


@app.post("/oficina-by-edificio")
async def get_oficina_by_edificio(
    edificioid: Edificioid, authorization: str = Header(...)
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    sp_name = "Ver_Oficina_by_Edificio"
    params = [edificioid.idEdificio]
    data = fetch_data_from_stored_procedure(sp_name, params)

    return data


@app.post("/visitante-by-dpi")
async def get_visitante_by_dpi(
    visistanteDPI: VisitanteDPI, authorization: str = Header(...)
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    sp_name = "VER_VISITANTE_BY_DPI"
    params = [visistanteDPI.visitanteDPI]
    data = fetch_data_from_stored_procedure(sp_name, params)

    return data


@app.post("/insertar-visitante")
async def insert_data(
    visitante: Visitante,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insert_Visitante"
    params = [
        visitante.dpi,
        visitante.apellido,
        visitante.nombre,
        visitante.direccion,
        visitante.telefono,
    ]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-funcionario")
async def insert_funcionario(
    funcionario: Funcionario,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insertar_Funcionario"
    params = [
        funcionario.dpi,
        funcionario.apellido,
        funcionario.nombre,
        funcionario.idOficina,
        funcionario.idEdificio,
    ]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-visita")
async def insert_visita(
    visita: Visita,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insert_Visita"
    params = [visita.idVisitante, visita.fecha, visita.hora]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-tramite-visita")
async def insert_visita_tramite(
    tramite_visita: TramiteVisita,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insertar_Tramite_Visitante"
    params = [tramite_visita.idVisitante,tramite_visita.idTramite, tramite_visita.fecha]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-oficina")
async def insert_office(
    oficina: Oficina,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insertar_Oficina"
    params = [
        oficina.idEdificio,
        oficina.numeroOficina,
    ]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-edificio")
async def insert_edificio(
    edificio: Edificio,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insertar_Edificio"
    params = [edificio.edificio]

    result = execute_stored_procedure(sp_name, params)

    return result


@app.post("/insertar-tramite")
async def insert_tramite(
    tramite: Tramite,
    authorization: str = Header(...),
):
    token = authorization.split(" ")[1]
    if not is_token_valid(token):
        raise HTTPException(status_code=401, detail="Token invalido o expirado")

    sp_name = "Insertar_Tramite"
    params = [tramite.tramite]

    result = execute_stored_procedure(sp_name, params)

    return result
