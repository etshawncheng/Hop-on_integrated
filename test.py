import json
import pymysql
conn = None
with open("config.json", mode="r", encoding="utf-8") as f:
    config = json.JSONDecoder().decode(f.read())["mysql"]
    config["cursorclass"] = pymysql.cursors.DictCursor
    conn = pymysql.Connection(**config)
r = None
p = None
with conn.cursor() as cursor:
    sql = "select * from project.user_info;"
    p = cursor.execute(sql)
    result = cursor.fetchone()
    if result:
        r = result
conn.close()
print(r, p)
