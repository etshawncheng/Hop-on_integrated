import logging
import sys
import pymysql
import json
import hashlib


def verify(name: str, sex: int, birthDate: str, email: str, account: str, password: str, team_id) -> str:
    sha256 = hashlib.sha256()
    sha256.update(password.encode("ascii"))
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)
    id = -1
    with conn.cursor() as cursor:
        sql = "INSERT INTO project.user_info(user_name,user_sex,user_birth_date,user_email,user_account,user_password,user_sign_time)VALUES(%s,%s,%s,%s,%s,%s,now())"
        cursor.execute(sql, (name, sex, birthDate, email, account, sha256.digest()))
    conn.commit()
    with conn.cursor() as cursor:
        sql = "Select user_id, user_password from USER_info where user_email=%s"
        cursor.execute(sql, (account, account))
        result = cursor.fetchone()
        if result:
            sha256 = hashlib.sha256()
            sha256.update(password.encode("ascii"))
            v = sha256.digest()
            if v+(64-len(v))*b"\x00" == result["user_password"]:
                id = result["user_id"]
    if team_id!="null":
        with conn.cursor() as cursor:
            l = f"(select teammate_list as ll from project.team WHERE team_id=%s)"
            sql = f"update project.team set teammate_list = if({l}!=null, concat(15,',', {l}),{l});"
            cursor.execute(sql, (team_id,team_id,team_id))
        conn.commit()            
    conn.close()
    return id


if __name__ == "__main__":
    result = verify(*sys.argv[1:])
    sys.stdout.write(str(result))
