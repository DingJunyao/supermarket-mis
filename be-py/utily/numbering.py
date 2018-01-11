#!/usr/bin/env python3
import pymysql
from utily import svar
from utily import check
import time

def numbering(type):
    code = ''
    d = time.strftime("%y%m%d",time.localtime())
    db = pymysql.connect(svar.dbURL, svar.dbUsername, svar.dbPassword, svar.dbDatabase, charset="utf8",
                         use_unicode=True)
    cursor = db.cursor()
    if type == 'order':
        code += '2' + d
        cursor.execute('SELECT DISTINCT `ogid` FROM `order` WHERE `ogid` LIKE "' + code + '%" ORDER BY ogid DESC')
        results = cursor.fetchall()
    elif type == 'out':
        code += '0' + d
        cursor.execute('SELECT DISTINCT `rgid` FROM `wrecord` WHERE `rgid` LIKE "' + code + '%" ORDER BY rgid DESC')
        results = cursor.fetchall()
    elif type == 'in':
        code += '1' + d
        cursor.execute('SELECT DISTINCT `rgid` FROM `wrecord` WHERE `rgid` LIKE "' + code + '%" ORDER BY rgid DESC')
        results = cursor.fetchall()
    else:
        return -1
    if results:
        code += str(int(results[0][0][-2]) + 1)
    else:
        code += '1'
    code += str(check.get_check_code(code))
    return code