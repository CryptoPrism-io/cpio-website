import asyncio
import threading
import http.server
import functools
import os
import requests
from playwright.async_api import async_playwright

TELEGRAM_BOT_TOKEN = "7911188723:AAFB1_XTNd_1kDNhvqfhm6C0gL34HE8P8fU"
TELEGRAM_CHAT_ID = "-4708531708"

DECK_DIR = os.path.join(os.path.dirname(__file__), "..", "deck")
PDF_PATH = os.path.join(DECK_DIR, "CryptoPrism_PitchDeck_V3.pdf")
SERVE_PORT = 8765
DECK_URL = f"http://localhost:{SERVE_PORT}/CryptoPrism_Deck_V3.html"


def start_server():
    handler = functools.partial(
        http.server.SimpleHTTPRequestHandler, directory=DECK_DIR
    )
    httpd = http.server.HTTPServer(("127.0.0.1", SERVE_PORT), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd


async def generate_pdf():
    httpd = start_server()
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page(viewport={"width": 1920, "height": 1080})

            await page.goto(DECK_URL, wait_until="networkidle")
            await page.wait_for_timeout(6000)

            await page.emulate_media(media="print")
            await page.wait_for_timeout(2000)

            await page.pdf(
                path=PDF_PATH,
                format="A4",
                landscape=True,
                print_background=True,
                margin={"top": "0mm", "bottom": "0mm", "left": "0mm", "right": "0mm"},
                display_header_footer=False,
            )
            print(f"PDF generated: {PDF_PATH}")
            await browser.close()
    finally:
        httpd.shutdown()


def send_telegram(pdf_path: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
    with open(pdf_path, "rb") as f:
        resp = requests.post(
            url,
            data={
                "chat_id": TELEGRAM_CHAT_ID,
                "caption": (
                    "CryptoPrism Pitch Deck V3 (Standalone)\n"
                    "A4 Landscape | 18 slides | D3 visualizations\n\n"
                    "Standalone HTML build — hardcoded grids, no responsive breakpoint issues.\n"
                    "6 interactive D3.js charts: radar, crash line, market bars, TAM circles, "
                    "dual-axis growth, scenario projections.\n\n"
                    "cryptoprism.io | yogeshsahu.xyz"
                ),
            },
            files={
                "document": ("CryptoPrism_PitchDeck_V3.pdf", f, "application/pdf")
            },
        )
    if resp.status_code == 200 and resp.json().get("ok"):
        print("Sent to Telegram successfully!")
    else:
        print(f"Telegram send failed: {resp.text}")


if __name__ == "__main__":
    asyncio.run(generate_pdf())
    send_telegram(PDF_PATH)
