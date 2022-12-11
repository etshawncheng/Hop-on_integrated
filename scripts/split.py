# coding=utf-8
import pandas as pd
import numpy as np
import json
import jieba
import pymysql
pd.set_option('display.max_columns', None)
np.set_printoptions(threshold=2**31)
np.set_printoptions(precision=3)
tag_df = pd.read_excel(
    r'C:\VS_Workplace\graduate_project\data\original_data\csv\tag.xlsx')
df = None
with open("config.json", mode="r", encoding="utf-8") as f:
    config = json.JSONDecoder().decode(f.read())["mysql"]
    config["cursorclass"] = pymysql.cursors.DictCursor
    conn = pymysql.Connection(**config)
    with conn.cursor() as cursor:
        sql = "Select attraction_id, attraction_name, attraction_desc_path from project.attraction where attraction_desc_path !=''"
        cursor.execute(sql)
        result = cursor.fetchall()
        df=pd.DataFrame(result)
print(df.head())
words = list()
plot = set()
for d in df['attraction_desc_path']:
    # summ = np.zeros(shape=500)
    cutted = set(jieba.cut(str(d)))
    words.append(cutted)
    plot|=cutted
for w in sorted(plot):
    tmp = [1 if w in words[i] else 0 for i in range(len(df['attraction_desc_path']))]
    df[w] = tmp
pd.DataFrame(plot).to_csv("scripts/words.csv")
# tagged_set = set(tag_df[tag_df.columns[0]])
# name_set = set(df.name)
# df_index_list = list(filter(lambda i: df.name[i] in name_set&tagged_set, df.index))
# tag_index_list = list(filter(lambda i: tag_df.景點名稱[i] in name_set&tagged_set, tag_df.index))