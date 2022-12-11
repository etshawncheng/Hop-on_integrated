import sys
import pymysql
import json
import numpy 

def getVote(x):
    d ={'num':len(x["vote"]), 'userId': x["user_id"], 'editCount': x["edit_count"] }
    return d

def getVotedUsers(x):
    return x['vote']


def check(teamId: str) -> str:
    conn = None
    with open("config.json", mode="r", encoding="utf-8") as f:
        config = json.JSONDecoder().decode(f.read())["mysql"]
        config["cursorclass"] = pymysql.cursors.DictCursor
        conn = pymysql.Connection(**config)

    with conn.cursor() as cursor:
        sql = 'Select * from project.team where team_id = %s'
        cursor.execute(sql, (teamId))
        result = cursor.fetchone()

        typ = ''

        if len(result["completed"]) == 1:
            typ = 'check'
            sql = 'Select * from project.schedule where edit_Count =%s'
        elif result["completed"][-1] == 'v':
            typ = 'vote'
            sql = 'Select * from project.schedule where edit_Count = %s'
        elif result["completed"][-1] == 'c':
            return 'completed'
        # 投票完或表態完?
        cursor.execute(sql, (result[0]))
        res = cursor.fetchall()
        votes = map(getVote, res)
        voteSum = 0
        re = dict()
        re["type"] = typ
        for i in range(0, len(votes)):
            voteSum = voteSum + votes[i]['num']
        
        #如果大家都投/表態完
        if voteSum == result['people_count']:
            if re['type'] == 'check':
                #找有沒有人修改
                sql = 'Select * from project.schedule where edit_Count = %s'
                cursor.execute(sql, (newRound))
                if cursor.fetchone() == None:
                    #改變成completed
                    sql = 'Update project.team set completed = %s where team_id = %s'
                    newRound = result["completed"] + 'c'
                    cursor.execute(sql, (newRound, teamId))
                    return 'completed'
                else: 
                    #進到投票
                    sql = 'Update project.team set completed = %s where team_id = %s'
                    newRound = int(result["completed"]) + 1
                    newRound = str(newRound) + 'v'
                    cursor.execute(sql, (newRound, teamId))
                    return 'intoVote'

            elif re['type'] == 'vote':
                # 計算票數 -> 更換team.completed
                maxIndex = 0
                for i in range(0, len(votes)):
                    if votes[i]['num'] > votes[maxIndex]['num']:
                        maxIndex = i
                    elif votes[i]['num'] == votes[maxIndex]['num']:
                        maxIndex = maxIndex
                #更新投票結果
                sql = 'Update project.schedule_version set edit_count = %s where user_id = %s'
                newEc = int(votes[maxIndex]['editCount']) + 1
                userId = votes[maxIndex]['userId']
                cursor.execute(sql, (newEc, userId))
                #結束投票階段
                sql = 'Update project.team set completed = %s where team_id = %s'
                newRound = result["completed"][0]
                cursor.execute(sql, (newRound, teamId))
                #回傳最高票數的那一個
                return 'intoCheck'
        #如果有人沒投完
        else:
            # return 誰還沒有投票/ 表態
            votedUser = map(getVotedUsers,res)
            notYet = numpy.setxor1d(result['teammate_list'], votedUser)
            return 'notYet'

if __name__ == '__main__':
    result = check(*sys.argv[1:])
    # result = check(teamId)
    sys.stdout.write(str(result))
