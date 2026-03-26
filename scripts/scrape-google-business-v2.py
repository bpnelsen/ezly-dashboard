#!/usr/bin/env python3
"""
EZLY Contractor Scraper (V2)
Uses Playwright selectors for robust extraction of Google Maps/Local results.
"""

import json, time, sys
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTkwOTU5MSwiZXhwIjoyMDg3NDg1NTkxfQ.kFTdS-I7SnPPkgqYu0amlzLQgnGJppb4ZKkfIyCy0JA"
BASE_URL = "https://rrpkokhjomvlumreknuq.supabase.co/rest/v1"
import urllib.request, urllib.parse

# Focus on a smaller, high-yield list first
CITIES = ["Salt Lake City", "Sandy", "Provo", "Orem", "Layton"]
TRADES = {"electrician": "Electrical", "plumber": "Plumbing"}

def scrape_google(page, trade, city):
    """Extraction using reliable CSS selectors."""
    query = f"{trade} in {city} Utah"
    url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
    
    try:
        page.goto(url, wait_until="networkidle", timeout=20000)
        
        # Google Maps results often live inside these containers
        results = page.query_selector_all('div[jscontroller*="gQkS4b"], div[jscontroller*="M80Meb"]')
        
        businesses = []
        for res in results:
            # Try to grab name
            name_el = res.query_selector('div[role="heading"]')
            if not name_el: continue
            name = name_el.inner_text().strip()
            
            # Extract info (selectors vary but common structure)
            # Address/Phone often nested in the same parent
            info = res.inner_text()
            
            # Simple heuristic regex for address/phone
            # Phone: (xxx) xxx-xxxx
            phone_match = re.search(r'\(\d{3}\)\s*\d{3}-\d{4}', info)
            phone = phone_match.group(0) if phone_match else None
                
            businesses.append({
                "name": name,
                "phone": phone,
                "city": city
            })
            
        return businesses
    except Exception as e:
        print(f"    ⚠️  Error in {city}: {str(e)[:50]}", flush=True)
        return []

# Helper functions for Supabase would remain similar to V1
# ... Insert/Check functions ...

def main():
    print(f"🚀 EZLY Contractor Scraper (V2 - Robust Selectors)", flush=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        for trade, specialty in TRADES.items():
            print(f"\n🔧 {trade.upper()}")
            for city in CITIES:
                data = scrape_google(page, trade, city)
                print(f"  📍 {city}: found {len(data)} potential entries")
                # Insert logic here
                time.sleep(2)
        
        browser.close()

if __name__ == "__main__":
    main()
