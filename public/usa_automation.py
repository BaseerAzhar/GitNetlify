# Example content of usa_automation.py
import time
from playwright.sync_api import sync_playwright

def run_test():
    try:
        with sync_playwright() as p:
            print("Launching browser...")  # This is for debugging
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("https://www.google.com")
            print("Test passed! Browser opened successfully.")  # This is for debugging
            browser.close()
    except Exception as e:
        print(f"Test failed: {e}")

# Run the test
run_test()
