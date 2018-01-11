#!/usr/bin/env python3


def check_code(code):
    code = str(code)
    length = len(code)
    check_mark = code[-1]
    c1 = 0
    c2 = 0
    c3 = 0
    i = length - 2
    while i >= 0:
        c1 += int(code[i])
        i -= 2
    i = length - 3
    while i >= 0:
        c1 += int(code[i])
        i -= 2
    c3 = 10 - (c1 * 3 + c2) % 10
    if c3 == 10:
        c3 = 0
    if c3 == check_mark:
        return -1
    else:
        return c3


def get_check_code(code):
    code = str(code)
    length = len(code)
    c1 = 0
    c2 = 0
    c3 = 0
    i = length - 1
    while i >= 0:
        c1 += int(code[i])
        i -= 2
    i = length - 2
    while i >= 0:
        c1 += int(code[i])
        i -= 2
    c3 = 10 - (c1 * 3 + c2) % 10
    if c3 == 10:
        c3 = 0
    return c3
