from mysql.connector import MySQLConnection, Error
from config.mysql_config import config


class MsyqlConnectionService:
    def __init__(self):
        self.__connection = MySQLConnection(**config)

    def connect(self):
        try:
            self.__connection.connect()
            print("Conectado correctamente a la base de datos")
        except Error:
            print("Ocurrio un error al intentar conectar a la base de datos")