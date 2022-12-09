import logging
import sys
import pymysql
import json
import hashlib


def verify(name: str, sex: int, birthDate: str, email: str, account: str, password: str) -> str:
    sha256 = hashlib.sha256()
    sha256.update(password.encode("ascii"))
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)
    r = None
    with conn.cursor() as cursor:
        sql = "INSERT INTO project.user_info(user_name,user_sex,user_birth_date,user_email,user_account,user_password,user_sign_time)VALUES(%s,%s,%s,%s,%s,%s,now())"
        r = cursor.execute(sql, (name, sex, birthDate, email, account, sha256.digest()))
    conn.commit()
    conn.close()
    return r


if __name__ == "__main__":
    result = verify(*sys.argv[1:])
    sys.stdout.write(result)
