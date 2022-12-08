import logging
import sys
import pymysql
import json
import os
import datetime


def verify(account: str, password: str) -> str:
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)
    id = '-1'
    with conn.cursor() as cursor:
        sql = "Select user_id, user_password from USER_info where user_email=%s or user_account=%s"
        cursor.execute(sql, (account, account))
        result = cursor.fetchone()
        # b = struct.pack((f"{len(password)*'c'}{64-len(password)}x",) + tuple(j for j in bytearray(int(i) for i in password)))
        # print(b)
        # if b==result["user_password"]:
        if result:
            id = str(result["user_id"])
    conn.close()
    return id


if __name__ == "__main__":
    # file_path = __file__[:__file__.rfind("\\")]
    # log_path = os.path.join(
    #     file_path, "log", ".log")
    # if not os.path.exists(log_path[:__file__.rfind("\\")]):
    #     sys.stdout.write("building directory: log\n")
    #     os.makedirs(log_path[:__file__.rfind("\\")])
    # logging.basicConfig(level=logging.DEBUG,
    #                     format='%(asctime)s|%(name)-12s|%(relativeCreated)d|%(levelname)-8s|%(message)s',
    #                     datefmt='%y-%m-%d %H:%M:%S',
    #                     filename=log_path)
    result = verify(*sys.argv[1:])
    sys.stdout.write(result)
    # logging.debug(result)
