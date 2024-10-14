import pyodbc

SERVER = "localhost"
DATABASE = "master"
USERNAME = "sa"
PASSWORD = "fakePassw0rd"
PORT = "1433"

# connectionString = f"DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD}"

connectionString = f"DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD};TrustServerCertificate=Yes"

try:
    conn = pyodbc.connect(connectionString)
    print("Conectado")
except Exception as e:
    print("No conecto\n", e)

