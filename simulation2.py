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

ok = "nok"
users = {"曹越": "18811568652", "张浩": "13820896871", "魏明名": "18983097850",
         "龚辉煌": "15300270049", "倪睿": "19801288725", "洪歌": "18811398104",
         "孟祥梁": "13051328668", "孔海天": "15076000307", "贾璧莹": "15033598072",
         "朱以坤": "15550781153", "李浩然": "13944676147"}
'''
while True:
    ok = input("登录后输入ok！")
    if ok == "ok":
        break
'''


def open_browser():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=MicroMessenger")
    browser = webdriver.Chrome(options=options)
    browser.maximize_window()
    browser.get(url)
    return browser


def login():
    name = item[0]
    passwd = item[1]
    name_input = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "body > div.login_ind > div.middle > div > div.inp > div:nth-child(1) > div.i > input")))
    name_input.click()
    name_input.send_keys(name)
    passwd_input = browser.find_element_by_css_selector(
        "body > div.login_ind > div.middle > div > div.inp > div:nth-child(2) > div.i > input")
    passwd_input.click()
    passwd_input.send_keys(passwd)
    login = browser.find_element_by_css_selector("body > div.login_ind > div.middle > div > button")
    login.click()


for item in users.items():
    browser = open_browser()
    login()
    time.sleep(2)
    while True:
        try:
            start = WebDriverWait(browser, 2, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
            start.click()
        except:
            know = browser.find_element_by_css_selector("#layui-m-layer0 > div.layui-m-layermain > div > div > div.layui-m-layerbtn > span")
            know.click()
            time.sleep(2)
            login = browser.find_element_by_css_selector("body > div.login_ind > div.middle > div > button")
            login.click()
        else:
            break

    time.sleep(5)
    for i in range(300):
        browser.switch_to.window(browser.window_handles[0])
        try:
            start = WebDriverWait(browser, 2, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
            start.click()
        except:
            quit_play = WebDriverWait(browser, 5, 0.5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "body > div.button > ul > li:nth-child(2) > div")))
            quit_play.click()
        time.sleep(0.5)
        ul = WebDriverWait(browser, 5, 0.1).until(EC.presence_of_element_located((By.ID, "o")))
        li_list = ul.find_elements_by_tag_name("li")
        li_right = li_list[0]
        li_right.click()
        time.sleep(0.2)
        next_button = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "body > div.button > ul > li:nth-child(2) > div")))
        next_button.click()
        time.sleep(1)
        quit_play = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "body > div.button > ul > li:nth-child(2) > div")))
        quit_play.click()
        time.sleep(0.3)
    browser.quit()





