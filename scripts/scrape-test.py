from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://www.google.com/search?q=electrician+in+salt+lake+city")
    page.screenshot(path="search.png")
    print(page.content()[:1000])
    browser.close()
