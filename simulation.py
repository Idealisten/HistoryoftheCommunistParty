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

options = webdriver.ChromeOptions()
options.add_argument("user-agent=MicroMessenger")
browser = webdriver.Chrome(options=options)
browser.maximize_window()
browser.get(url)

while True:
    ok = input("登录后输入ok！")
    if ok == "ok":
        break

for i in range(500):
    browser.switch_to.window(browser.window_handles[0])
    if i % 5 == 0:
        browser.get("http://ceshi.fotoncul.com.cn/title")
    try:
        start = WebDriverWait(browser, 5, 0.5).until(EC.presence_of_element_located((By.CLASS_NAME, "piecel-box")))
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





