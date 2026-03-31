#!/usr/bin/env python3
"""
EZLY Contractor Scraper (V2)
Uses Playwright selectors for robust extraction of Google Maps/Local results.
"""

import json, time, sys, re
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
        
# Updated selectors to match current Google search structure
        # Google Maps results container
        # Often reside in g-card, or search results containers
        results = page.query_selector_all('div.g')
        
        businesses = []
        for res in results:
            # Name
            name_el = res.query_selector('h3')
            if not name_el: continue
            name = name_el.inner_text().strip()
            
            # Phone: Google search often embeds this in a 'span' or 'div' with specific patterns
            # Or in the Maps block specifically
            phone_el = res.query_selector('span:has-text("(")')
            phone = phone_el.inner_text().strip() if phone_el else None
            
            # Simplified for robustness without relying on rigid jscontroller IDs
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
