from configparser import ConfigParser
from os.path import join, dirname, realpath

class Config:

    # 初始化
    def __init__(self, route=""):
        self.__config = ConfigParser()
        self.__config.read(join(route, 'config.ini'), encoding = 'utf8')
        self.__value = ''

    # 取用「設定檔」內資料庫參數
    def getDatabase(self):
        data = {
            "host": str(self.__config["database"]["host"]),
            "port": int(self.__config["database"]["port"]),
            "user": str(self.__config["database"]["user"]),
            "passwd": str(self.__config["database"]["password"]),
            "db": str(self.__config["database"]["database"]),
            "charset": str(self.__config["database"]["charset"]),
        }

        return data

    # 取用「設定檔」一般 section 的 key 之 value
    def getValue(self, section, key):
        self.value = self.__config[section][key]
        return self.value