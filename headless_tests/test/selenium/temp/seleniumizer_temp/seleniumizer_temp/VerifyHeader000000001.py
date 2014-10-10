from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re

class VerifyHeader000000001(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8004/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_verify_header000000001(self):
        driver = self.driver
        try:
            driver.get(self.base_url + "/login/")
            driver.find_element_by_id("id_username").clear()
            driver.find_element_by_id("id_username").send_keys("varify")
            driver.find_element_by_id("id_password").clear()
            driver.find_element_by_id("id_password").send_keys("varify")
            driver.find_element_by_xpath("//input[@value='Login']").click()
            driver.find_element_by_link_text("Workspace").click()
            driver.find_element_by_link_text("Discover").click()
            driver.find_element_by_link_text("Varify").click()
            driver.find_element_by_link_text("Results").click()
            driver.find_element_by_xpath("//div[@id='content']/div[2]/div[2]/div[2]/div/div/div[3]/div/button").click()

            assert 1
        except:
            driver.get_screenshot_as_file("{0}/{1}/{2}/{3}/{4}".format(os.getcwd(),"headless_tests","test","screen_shots","VerifyHeader000000001.png"))
            assert 0, "Header Verification Failed"
 
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
