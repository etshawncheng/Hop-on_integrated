import hashlib
import logging
import sys
import pymysql
import json
import os
import datetime
import pandas as pd
import numpy as np
from formroute import Route
import re
sim_df = pd.read_csv("./scripts/sim.csv")
prd_df = pd.read_csv("./scripts/prd.csv")


def score(indexes):
    r = np.zeros(sim_df.shape)
    for i in indexes:
        r += [sim_df[str(i)]]
    return r


def verify(record, user_id, team_id) -> str:
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)
    team_data = None
    with conn.cursor() as cursor:
        sql = "Select region_list, period from project.team where team_id=%s"
        cursor.execute(sql, (team_id,))
        team_data = cursor.fetchone()
    person_data = None
    with conn.cursor() as cursor:
        sql = "Select spot_type, spot_per_day from project.comprehensive_inquiry where team_id=%s and user_id=%s"
        cursor.execute(sql, (user_id, team_id))
        person_data = cursor.fetchone()
    df = None
    with conn.cursor() as cursor:
        regions = [int(i) for i in team_data["region_list"].split()]
        s = ' or '.join(['attraction_region=%s']*len(regions))
        sql = f"Select attraction_id, attraction_name, attraction_pluscode from project.attraction where {s}"
        # print(sql, tuple(int(i)for i in team_data["region_list"].split()))
        cursor.execute(sql, regions)
        df = pd.DataFrame(cursor.fetchall())
    prd_df["score"] = score([1, 2, 3, 4, 5])[0]
    inner = pd.merge(how="inner", left=prd_df, right=df,
                     left_on="景點名稱", right_on="attraction_name")
    # inner
    R = Route(inner)
    route = R.form_route(3, 5)
    schedule = "/".join(",".join(str(i)for i in r) for r in route)
    with conn.cursor() as cursor:
        sql = "insert into project.schedule_version (team_id,user_id,edit_count,travel_schedule,vote) values (%s,%s,%s,%s,%s);"
        r = cursor.execute(sql, (int(team_id), int(user_id), 0, schedule, ""))
        # print(r)
    conn.commit()
    conn.close()
    return schedule


if __name__ == "__main__":
    result = verify(*sys.argv[1:])
    # result = verify(*['1,1,-1,-1,1', '1', '9'])
    sys.stdout.write(str(result))
