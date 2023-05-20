from service.connection_mysql import MsyqlConnectionService

class MysqlConnectionHandler:

    def __init__(self):
        self.__connection = MsyqlConnectionService()

    def connect(self):
        self.__connection.connect()
