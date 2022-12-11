import hashlib
import logging
import sys
import pymysql
import json
import os
import datetime
import pandas as pd
import numpy as np


sim_df = pd.read_csv("./scripts/sim.csv")

def score(indexes):
    r = np.zeros(sim_df.shape)
    print(r.shape)
    for i in indexes:
        r += [sim_df[i]]
    return r

def verify(team_id) -> str:
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)
    with conn.cursor() as cursor:
        sql = "Select user_id, user_password from USER_info where user_email=%s or user_account=%s"
        cursor.execute(sql)
        result = cursor.fetchone()
        if result:
            sha256 = hashlib.sha256()

    conn.close()
    return id


if __name__ == "__main__":
    result = verify(*sys.argv[1:])
    result = verify(["1", "2", "3"])
    # for i in range(1,len(result)):
    #     print(result[i-1]==result[i])
    sys.stdout.write(str(result))
