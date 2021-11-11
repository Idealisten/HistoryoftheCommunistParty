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
global li_right

options = webdriver.ChromeOptions()
options.add_argument("user-agent=MicroMessenger")
browser = webdriver.Chrome(options=options)
browser.maximize_window()
browser.get(url)
wait_time = int(input("请输入答题时间："))
# wait_time = wait_time - 2
# ok = "nok"


def countdown():
    global wait_time, ok
    while wait_time > 0:
        # if ok == "ok":
        # print("\r" + str(wait_time), end="")
        time.sleep(1)
        wait_time -= 1
        if wait_time == 0:
            break

while True:
    browser.get("http://ceshi.fotoncul.com.cn/title")
    start = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
    t = threading.Thread(target=countdown)
    start.click()
    t.start()
    print("开始答题，请等待～")
    while question_index < 99:
        # print("question_index:" + str(question_index))
        if question_index == 0:
            browser.switch_to.window(browser.window_handles[0])
        time.sleep(0.1)
        ul = WebDriverWait(browser, 5, 0.1).until(EC.presence_of_element_located((By.ID, "o")))
        li_list = ul.find_elements_by_tag_name("li")
        time.sleep(0.1)
        p = browser.find_element_by_id("t")
        data_id = p.get_attribute("data-id")
        # li_right = li_list[answer_list[question_index]]
        question_right = p.get_attribute("da")
        if question_right == "A" or question_right == "a":
            li_right = li_list[0]

        elif question_right == "B" or question_right == "b":
            li_right = li_list[1]

        elif question_right == "C" or question_right == "c":
            li_right = li_list[2]

        elif question_right == "D" or question_right == "d":
            li_right = li_list[3]

        elif question_index == "650":
            li_right = li_list[1]
        time.sleep(0.1)
        li_right.click()
        time.sleep(0.2)
        question_index += 1
        next_button = browser.find_element_by_css_selector("body > div.button > ul > li:nth-child(2) > div")
        next_button.click()
        time.sleep(1.1)
    browser.switch_to.window(browser.window_handles[0])
    ul = WebDriverWait(browser, 5, 0.01).until(EC.presence_of_element_located((By.ID, "o")))
    p = browser.find_element_by_id("t")
    li_list = ul.find_elements_by_tag_name("li")
    data_id = p.get_attribute("data-id")
    question_right = p.get_attribute("da")
    if question_right == "A" or question_right == "a":
        li_right = li_list[0]
        li_right.click()
    elif question_right == "B" or question_right == "b":
        li_right = li_list[1]
        li_right.click()
    elif question_right == "C" or question_right == "c":
        li_right = li_list[2]
        li_right.click()
    elif question_right == "D" or question_right == "d":
        li_right = li_list[3]
        li_right.click()
    li_right.click()
    question_index += 1
    next_button = browser.find_element_by_css_selector("body > div.button > ul > li:nth-child(2) > div")
    t.join()
    while wait_time == 0:
        next_button.click()
        # print("\n答题结束")
        break
    question_index = 0

    again = input("\n答题结束，再答一次请返回首页后输入ok，退出输入quit")
    if again == "ok":
        wait_time = int(input("请输入答题时间："))
    else:
        break





