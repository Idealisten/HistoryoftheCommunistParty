import time
import demjson
import threading
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from requests import post

url = "http://ceshi.fotoncul.com.cn/login.html"
answer_url = "http://ceshi.fotoncul.com.cn/Ajax/DataHandler.php"

cookie = {}
answer_list = []
question_index = 0

options = webdriver.ChromeOptions()
options.add_argument("user-agent=MicroMessenger")
browser = webdriver.Chrome(options=options)
browser.maximize_window()
browser.get(url)
wait_time = int(input("请输入等待时间："))
s_wait_time = wait_time
ok = "nok"


def countdown():
    global wait_time, ok
    while wait_time > 0:
        if ok == "ok":
            print("\r" + str(wait_time), end="")
        time.sleep(1)
        wait_time -= 1
        if wait_time == 0:
            break


while True:
    ok = input("登录后输入ok！")
    if ok == "ok":
        break
while True:
    ok = "nok"
    cookie_list = browser.get_cookies()
    cookie[cookie_list[0]["name"]] = cookie_list[0]["value"]
    start = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
    start.click()

    t = threading.Thread(target=countdown)
    t.start()

    ok = input("\n请粘贴试卷后输入ok：")
    t.join()
    if wait_time == 0 and ok == ok:
        print("开始答题，请等待～")
        ok = "no"
        ul = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.ID, "o")))
        li_list = ul.find_elements_by_tag_name("li")
        with open('/Users/CAOYUE/Desktop/题库1.txt') as f:
            txt = f.read()
            txt_list = demjson.decode(txt)
            for question in txt_list:
                if question["right"] == "A":
                    answer_list.append(0)
                elif question["right"] == "B":
                    answer_list.append(1)
                elif question["right"] == "C":
                    answer_list.append(2)
                elif question["right"] == "D":
                    answer_list.append(3)
        while question_index < 100:
            browser.switch_to.window(browser.window_handles[0])
            ul = WebDriverWait(browser, 5, 0.1).until(EC.presence_of_element_located((By.ID, "o")))
            li_list = ul.find_elements_by_tag_name("li")
            li_right = li_list[answer_list[question_index]]
            li_right.click()
            question_index += 1
            time.sleep(0.1)
            next_button = browser.find_element_by_css_selector("body > div.button > ul > li:nth-child(2) > div")
            next_button.click()
            time.sleep(1.4)
        question_index = 0
        answer_list.clear()
        again = input("答题结束，再答一次请返回首页后输入ok，退出输入quit")
        if again == "ok":
            wait_time = int(input("请输入等待时间："))
            s_wait_time = wait_time
        else:
            break




