import urllib.request
import json
import ssl
import os
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

os.makedirs("frontend/public/projects", exist_ok=True)

targets = [
    # 1. Ticket Concert
    ("ticket-concert-hero", "https://www.ticketconcert.online", 1440, 900),
    ("ticket-concert-full", "https://www.ticketconcert.online", 1440, 1800),
    # 2. Fashion Nail Morley
    ("fashion-nail-hero", "https://fashionnailmorley.com.au", 1440, 900),
    ("fashion-nail-services", "https://fashionnailmorley.com.au/#services", 1440, 1000),
    # 3. ExamPlatform AI
    ("exam-platform-hero", "https://exam-platform.online", 1440, 900),
    ("exam-platform-overview", "https://exam-platform.online", 1440, 1600),
    # 4. VK Digital Hub
    ("vk-digital-hero", "https://vkdigitalhub.netlify.app", 1440, 900),
    ("vk-digital-services", "https://vkdigitalhub.netlify.app/#services", 1440, 1100),
]

def fetch_screenshot(name, site_url, width, height):
    dest = f"frontend/public/projects/{name}.png"
    if os.path.exists(dest) and os.path.getsize(dest) > 50000:
        print(f"Already exists: {dest} ({os.path.getsize(dest)} bytes)")
        return
    api_url = f"https://api.microlink.io?url={urllib.parse.quote(site_url)}&screenshot=true&viewport.width={width}&viewport.height={height}&viewport.deviceScaleFactor=2"
    print(f"Requesting {name} for {site_url}...")
    try:
        req = urllib.request.Request(api_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = json.loads(resp.read().decode())
            img_url = data.get("data", {}).get("screenshot", {}).get("url")
            if not img_url:
                print(f"No screenshot URL returned for {name}")
                return
            print(f"Downloading from {img_url}...")
            img_req = urllib.request.Request(img_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(img_req, context=ctx, timeout=30) as img_resp:
                img_data = img_resp.read()
                with open(dest, "wb") as f:
                    f.write(img_data)
                print(f"Saved {dest} ({len(img_data)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")

for item in targets:
    fetch_screenshot(*item)
    time.sleep(1.5)

print("Capture batch finished!")
