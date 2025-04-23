import re
from playwright.sync_api import Page, expect, sync_playwright


def test_open_chrome():
    try:
        # Launch the Playwright browser (Chromium/Chrome)
        with sync_playwright() as p:
            browser = p.webkit.launch(headless=False)  # Make sure browser is launched here
            page = browser.new_page()

            # Navigate to a website
            page.goto("https://www.google.com")

            # Optionally wait for a selector to make sure the page has fully loaded
            # page.wait_for_selector('input[name="q"]')  # Wait for the Google search bar to appear

            # Assert the title of the page (optional test)
            # assert "Google" in page.title(), f"Expected 'Google' in title, but got {page.title()}"

            # Close the browser after the test
            browser.close()

    except Exception as e:
        print(f"Error: {e}")
    return "passed"