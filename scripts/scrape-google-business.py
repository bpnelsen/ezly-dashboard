#!/usr/bin/env python3
"""
EZLY Contractor Scraper — Playwright-based Google Business scraper.
Renders Google Maps/Search to extract local business listings.
"""

import json, time, re, sys
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTkwOTU5MSwiZXhwIjoyMDg3NDg1NTkxfQ.kFTdS-I7SnPPkgqYu0amlzLQgnGJppb4ZKkfIyCy0JA"
BASE_URL = "https://rrpkokhjomvlumreknuq.supabase.co/rest/v1"

import urllib.request, urllib.parse

CITIES = [
    "Salt Lake City", "West Valley City", "West Jordan", "Sandy", "Murray",
    "Draper", "South Jordan", "Midvale", "Taylorsville", "Holladay",
    "Cottonwood Heights", "Kearns", "Riverton", "Herriman",
    "Provo", "Orem", "Lehi", "Pleasant Grove", "Spanish Fork",
    "Springville", "American Fork", "Saratoga Springs", "Payson", "Lindon",
    "Eagle Mountain", "Alpine", "Cedar Hills",
    "Layton", "Bountiful", "Kaysville", "Syracuse", "Clearfield",
    "Centerville", "Farmington", "Clinton", "Woods Cross", "North Salt Lake",
]

COUNTY_MAP = {
    "Salt Lake City": "Salt Lake County", "West Valley City": "Salt Lake County",
    "West Jordan": "Salt Lake County", "Sandy": "Salt Lake County",
    "Murray": "Salt Lake County", "Draper": "Salt Lake County",
    "South Jordan": "Salt Lake County", "Midvale": "Salt Lake County",
    "Taylorsville": "Salt Lake County", "Holladay": "Salt Lake County",
    "Cottonwood Heights": "Salt Lake County", "Kearns": "Salt Lake County",
    "Riverton": "Salt Lake County", "Herriman": "Salt Lake County",
    "Provo": "Utah County", "Orem": "Utah County", "Lehi": "Utah County",
    "Pleasant Grove": "Utah County", "Spanish Fork": "Utah County",
    "Springville": "Utah County", "American Fork": "Utah County",
    "Saratoga Springs": "Utah County", "Payson": "Utah County",
    "Lindon": "Utah County", "Eagle Mountain": "Utah County",
    "Alpine": "Utah County", "Cedar Hills": "Utah County",
    "Layton": "Davis County", "Bountiful": "Davis County",
    "Kaysville": "Davis County", "Syracuse": "Davis County",
    "Clearfield": "Davis County", "Centerville": "Davis County",
    "Farmington": "Davis County", "Clinton": "Davis County",
    "Woods Cross": "Davis County", "North Salt Lake": "Davis County",
}

TRADES = {
    "electrician": "Electrical",
    "plumber": "Plumbing",
    "roofer": "Roofing",
    "painter": "Painting",
    "HVAC": "HVAC",
}


def scrape_google(page, query, city):
    """Use Playwright to scrape Google local results."""
    url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
    
    try:
        page.goto(url, wait_until="networkidle", timeout=15000)
        time.sleep(2)  # Let local results render
        
        # Get text content of the page
        text = page.inner_text("body")
        
        businesses = []
        
        # Parse business listings from rendered text
        # Pattern: Name\nTrade type\nCity, UT\nOpen/Closes...\n(xxx) xxx-xxxx
        lines = text.split("\n")
        
        current_biz = {}
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Phone pattern
            phone_match = re.search(r'(\(\d{3}\)\s*\d{3}[-.\s]?\d{4})', line)
            if phone_match and current_biz.get("name"):
                current_biz["phone"] = phone_match.group(1)
                businesses.append(current_biz)
                current_biz = {}
                continue
            
            # Business name heuristic: long enough, not a UI element
            if (len(line) > 5 and len(line) < 80 
                and not line.startswith(("Open", "Closes", "Website", "Directions", "Call", "Schedule", "Sponsored"))
                and "·" not in line
                and not re.match(r'^[\d\s.,()]+$', line)
                and not current_biz.get("name")):
                
                # Check if next few lines have trade/location/phone indicators
                context = " ".join(lines[i:i+5])
                if re.search(r'(UT|Utah|\(\d{3}\))', context):
                    current_biz["name"] = line
                    
                    # Extract city from context
                    city_match = re.search(r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*UT', context)
                    if city_match:
                        current_biz["city"] = city_match.group(1)
        
        return businesses
    except Exception as e:
        print(f"    ⚠️  {str(e)[:60]}", flush=True)
        return []


def check_exists(name):
    """Check if contractor already exists."""
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/contractors?select=id&business_name=ilike.{urllib.parse.quote(name[:40])}*&limit=1",
            headers={"apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}"}
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            return len(json.load(resp)) > 0
    except:
        return False


def insert_contractor(c):
    """Insert into Supabase."""
    payload = json.dumps(c).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}/contractors", data=payload,
        headers={
            "apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}",
            "Content-Type": "application/json", "Prefer": "return=minimal"
        }, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status in [200, 201, 204]
    except:
        return False


def log_scrape(source, processed, added):
    """Log scrape run."""
    payload = json.dumps({
        "source": source, "records_processed": processed,
        "records_added": added, "status": "success"
    }).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}/scraping_logs", data=payload,
        headers={
            "apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}",
            "Content-Type": "application/json", "Prefer": "return=minimal"
        }, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            pass
    except:
        pass


def main():
    print(f"🏗️  EZLY Contractor Scraper (Playwright)", flush=True)
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M')}", flush=True)
    print(f"📍 {len(CITIES)} cities × {len(TRADES)} trades = {len(CITIES)*len(TRADES)} searches", flush=True)
    print(f"{'='*50}\n", flush=True)
    
    total_added = 0
    total_found = 0
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            locale="en-US",
        )
        page = context.new_page()
        
        for trade, specialty in TRADES.items():
            print(f"\n🔧 {trade.upper()}", flush=True)
            
            for city in CITIES:
                county = COUNTY_MAP.get(city, "Unknown")
                query = f"{trade} in {city} Utah"
                
                businesses = scrape_google(page, query, city)
                total_found += len(businesses)
                
                added = 0
                for biz in businesses:
                    name = biz.get("name", "").strip()
                    if not name or len(name) < 4 or check_exists(name):
                        continue
                    
                    contractor = {
                        "business_name": name[:200],
                        "phone": biz.get("phone", "")[:20],
                        "city": biz.get("city", "") or city,
                        "state": "UT",
                        "specialties": [specialty],
                        "source": "Google Business",
                        "contact_status": "new",
                        "metadata": {
                            "county": county,
                            "search_city": city,
                            "scrape_date": datetime.now(timezone.utc).isoformat(),
                        },
                    }
                    
                    if insert_contractor(contractor):
                        added += 1
                        total_added += 1
                    
                    time.sleep(0.3)
                
                if added > 0:
                    print(f"  ✅ {city}: +{added}", flush=True)
                
                time.sleep(3)  # Rate limit between cities
            
            log_scrape(f"scraper/{trade}", total_found, total_added)
            time.sleep(5)  # Between trades
        
        browser.close()
    
    print(f"\n{'='*50}", flush=True)
    print(f"📊 Added {total_added} new contractors", flush=True)
    log_scrape("scraper/complete", total_found, total_added)


if __name__ == "__main__":
    main()
