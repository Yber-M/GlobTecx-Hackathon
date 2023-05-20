from dotenv import load_env
import os
load_env()

config = {
    "user": "root",
    "password": os.getenv("MYSQL_ROOT_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "host": "localhost"
}