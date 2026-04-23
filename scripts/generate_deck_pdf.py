import asyncio
import requests
from playwright.async_api import async_playwright

TELEGRAM_BOT_TOKEN = "7911188723:AAFB1_XTNd_1kDNhvqfhm6C0gL34HE8P8fU"
TELEGRAM_CHAT_ID = "-4708531708"
PDF_PATH = "CryptoPrism_PitchDeck_V3.pdf"
DECK_URL = "http://localhost:5173/?print=1#/deck-v3"


async def generate_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})

        await page.goto(DECK_URL, wait_until="networkidle")
        await page.wait_for_timeout(5000)

        await page.emulate_media(media="print")
        await page.wait_for_timeout(2000)

        await page.pdf(
            path=PDF_PATH,
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "10mm", "bottom": "10mm", "left": "10mm", "right": "10mm"},
            display_header_footer=False,
        )
        print(f"PDF generated: {PDF_PATH}")
        await browser.close()


def send_telegram(pdf_path: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
    with open(pdf_path, "rb") as f:
        resp = requests.post(
            url,
            data={
                "chat_id": TELEGRAM_CHAT_ID,
                "caption": (
                    "CryptoPrism Pitch Deck V3\n"
                    "A4 Landscape | 21 slides\n\n"
                    "Fixed: slide page isolation — no more content overlap between pages.\n"
                    "cryptoprism.io | yogeshsahu.xyz"
                ),
            },
            files={"document": ("CryptoPrism_PitchDeck_V3.pdf", f, "application/pdf")},
        )
    if resp.status_code == 200 and resp.json().get("ok"):
        print("Sent to Telegram successfully!")
    else:
        print(f"Telegram send failed: {resp.text}")


if __name__ == "__main__":
    asyncio.run(generate_pdf())
    send_telegram(PDF_PATH)
