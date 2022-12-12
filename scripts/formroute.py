
import pygtrie as trie
import numpy as np
import pandas as pd


class Route:

    CODE_ALPHABET_ = '23456789CFGHJMPQRVWX'

    def __init__(self, df):
        self.pls_df = df
        self.T = trie.CharTrie()
        self.rank_dict = {}
        self.create_chartrie()
        self.create_rank_dict()

    def create_chartrie(self):
        for pluscode, name in zip(self.pls_df.attraction_pluscode, self.pls_df.attraction_id):
            self.T[pluscode] = name

    def create_rank_dict(self):
        tmp=self.pls_df[["attraction_pluscode", "score"]]
        tmp.sort_values(["score"])
        self.rank_dict = dict(zip(tmp.attraction_pluscode, tmp.index))

    def search_next_spot(self, testcode):
        search_range = []
        n = 1
        # 找到code放li
        li = []
        while len(li) == 0:
            # 調整搜尋範圍
            for i in range(-n, n):
                for u in range(-n, n):
                    # makesure X and Y in range of len of char list
                    testcode = self.base20(testcode, 4, i)
                    testcode = self.base20(testcode, 5, u)
                    search_range.append(testcode[:5])
            # 在搜尋範圍中檢查有沒有景點存在，有的話加到li
            for code in search_range:
                if self.T.has_node(code) != 0:
                    key_li = self.T.keys(code)
                    for k in key_li:
                        li.append(k)
            n+1

        bestpt = li[0]
        # rank 是多少
        currentMinRank = self.rank_dict[bestpt]
        for code in li:
            if self.rank_dict[code] < currentMinRank:
                currentMinRank = self.rank_dict[code]
                bestpt = code
        return bestpt

    def base20(self, code, n, i):
        CODE_ALPHABET_ = '23456789CFGHJMPQRVWX'
        #print(code)
        pos = CODE_ALPHABET_.index(code[n])
        npos = (pos+i) % 19
        nround = (pos+i)//19
        if nround > 0 and n > 2:
            code = self.base20(code, n-2, nround)
            code = list(code)
            code[n] = CODE_ALPHABET_[npos]
            str1 = ''
            code = str1.join(code)
            return code
        else:
            code = list(code)
            code[n] = CODE_ALPHABET_[npos]
            str1 = ''
            code = str1.join(code)
            return code

    def form_route(self, numOfDay, numOfView):
        schedule = []
        self.create_rank_dict()
        # 第一名
        testcode = list(self.rank_dict.keys())[0]
        # name?
        for i in range(numOfDay):
            li = []
            li.append(self.T.pop(testcode))
            self.rank_dict.pop(testcode)
            for i in range(numOfView):
                testcode = self.search_next_spot(testcode)
                li.append(self.T.pop(testcode))
                self.rank_dict.pop(testcode)
            testcode = self.search_next_spot(testcode)
            schedule.append(li)
        return schedule
