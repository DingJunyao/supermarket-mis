import pymysql
from utily import svar
from utily import check
import json

def showall():
    db = pymysql.connect(svar.dbURL, svar.dbUsername, svar.dbPassword, svar.dbDatabase, charset="utf8", use_unicode=True)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM `goods`')
    results = cursor.fetchall()
    print(results)
    arr = []
    for i in results:
        arr.append(list(i))
    for i in arr:
        i[4]=float(i[4])
    return arr
