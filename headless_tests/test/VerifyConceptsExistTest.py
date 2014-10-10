# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class VerifyConceptsExistTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.PhantomJS()
        self.driver.implicitly_wait(30)
        self.base_url = "http://0.0.0.0:8000/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_verify_concepts_exist(self):
        driver = self.driver
        driver.get(self.base_url + "login/")
        driver.find_element_by_id("id_username").clear()
        driver.find_element_by_id("id_username").send_keys("test")
        driver.find_element_by_id("id_password").clear()
        driver.find_element_by_id("id_password").send_keys("test")
        driver.find_element_by_xpath("//input[@value='Login']").click()
        driver.find_element_by_link_text("Discover").click()
        for i in range(60):
            try:
                if self.is_element_present(By.CSS_SELECTOR, "div.heading"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_css_selector("div.heading").click()
        driver.find_element_by_link_text("Quality").click()
        driver.find_element_by_link_text("Depth of Coverage").click()
        driver.find_element_by_xpath("//div[2]/div/div[2]/div").click()
        driver.find_element_by_link_text("Genomic Coordinate").click()
        driver.find_element_by_xpath("//div[3]/div").click()
        driver.find_element_by_link_text("1000G (All/Afr/Amr/Asn/Eur)").click()
        driver.find_element_by_link_text("EVS (All/Afr/Eur)").click()
        driver.find_element_by_xpath("//div[4]/div").click()
        driver.find_element_by_link_text("Cohorts").click()
        driver.find_element_by_xpath("//div[5]/div").click()
        driver.find_element_by_link_text("SIFT").click()
        driver.find_element_by_link_text("PolyPhen2").click()
        driver.find_element_by_xpath("//div[6]/div").click()
        driver.find_element_by_link_text("Functional Class").click()
        driver.find_element_by_link_text("Effect").click()
        driver.find_element_by_link_text("Effect Impact").click()
        driver.find_element_by_xpath("//div[7]/div").click()
        driver.find_element_by_link_text("HGMD").click()
        driver.find_element_by_xpath("//div[8]/div").click()
        driver.find_element_by_link_text("Genotype").click()
        driver.find_element_by_xpath("//div[9]/div").click()
        driver.find_element_by_link_text("Gene Set").click()
        driver.find_element_by_link_text("Gene").click()
        driver.find_element_by_link_text("test").click()
        driver.find_element_by_link_text("Logout").click()

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
