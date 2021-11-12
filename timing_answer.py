import time
import threading
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "http://ceshi.fotoncul.com.cn/login.html"
answer_url = "http://ceshi.fotoncul.com.cn/Ajax/DataHandler.php"

question_index = 0
global li_right, data_id, next_button
next_circle = "n"

options = webdriver.ChromeOptions()
options.add_argument("user-agent=MicroMessenger")
browser = webdriver.Chrome(options=options)
browser.maximize_window()
browser.get(url)
wait_time = int(input("请输入答题时间："))
wait_time_s = wait_time


def countdown():
    global wait_time
    while wait_time > 0:
        # print("\r" + str(wait_time), end="")
        print(wait_time)
        time.sleep(1)
        wait_time -= 1
        if wait_time == 0:
            break


def nextcircle():
    global next_circle
    next_circle = input("立刻进入下一轮答题请输入r:")


def click_answer():
    global question_index, data_id, li_right, next_button
    browser.switch_to.window(browser.window_handles[0])
    time.sleep(1.1)
    ul = WebDriverWait(browser, 5, 0.1).until(EC.presence_of_element_located((By.ID, "o")))
    li_list = ul.find_elements_by_tag_name("li")
    time.sleep(0.2)
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
    time.sleep(0.2)
    li_right.click()
    time.sleep(0.2)
    question_index += 1
    next_button = browser.find_element_by_css_selector("body > div.button > ul > li:nth-child(2) > div")


def answer_question():
    global question_index, next_circle
    browser.get("http://ceshi.fotoncul.com.cn/title")
    start = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
    t = threading.Thread(target=countdown)
    t2 = threading.Thread(target=nextcircle)
    start.click()
    t.start()
    t2.start()
    print("开始答题，请等待～")
    question_index = 0
    while question_index < 99:
        if next_circle == "r":
            next_circle = "n"
            answer_question()
        print("question_index:" + str(question_index))
        click_answer()
        next_button.click()
        if question_index == 99:
            click_answer()
            t.join()
            while wait_time == 0:
                next_button.click()
                time.sleep(2)
                answer_question()
                break
    question_index = 0


def main():
    global question_index, wait_time, next_circle
    while True:
        print(wait_time_s)
        wait_time = wait_time_s
        next_circle = "n"
        try:
            answer_question()
        except:
            continue


if __name__ == "__main__":
    main()





