import hashlib
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
        sql = "select user_id, user_password from USER_info where user_email=%s"
        cursor.execute(sql, (account,))
        result = cursor.fetchone()
        if result:
            sha256 = hashlib.sha256()
            sha256.update(password.encode("ascii"))
            v = sha256.digest()
            if v+(64-len(v))*b"\x00" == result["user_password"]:
                id = result["user_id"]
    conn.close()
    return id


if __name__ == "__main__":
    result = verify(*sys.argv[1:])
    sys.stdout.write(str(result))
