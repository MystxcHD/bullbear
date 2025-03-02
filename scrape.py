# Scrapes and processes the website and returns sentimental analysis using GeminiAPI in the format 'COMPANY (TICKER) - NEGATIVE/POSITIVE'
from url import receive_url
import requests
import time
from bs4 import BeautifulSoup
import google.generativeai as genai
from pathlib import Path
import fitz
from fpdf import FPDF

def scrape_article_text(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    retries = 3
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")

            article_body = soup.find("article") or soup.find("div", class_="article-body")

            if not article_body:
                print("Error: Could not find the article content. Check the site's structure.")
                return None
            
            article_text = article_body.get_text(separator="\n", strip=True)

            return article_text

        except requests.exceptions.HTTPError as e:
            print(f"HTTP Error: {e}, retrying... ({attempt+1}/{retries})")
            time.sleep(5)

    return None

def save_as_pdf(text, filename="output.pdf"):
    if not text:
        print("No text extracted. PDF not generated.")
        return

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    pdf.add_font("Arial", "", "/Library/Fonts/Arial Unicode.ttf", uni=True)
    pdf.set_font("Arial", size=12)

    text = text.encode('latin-1', 'replace').decode('latin-1')

    pdf.multi_cell(0, 10, text)
    pdf.output(filename)
    print(f"PDF saved as '{filename}'")

pdf_file = "scraped_text.pdf"

def read_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    doc.close()
    return text

def delete_pdf(file_path):
    file = Path(file_path)
    if file.exists():
        file.unlink()
        print(f"{file_path} deleted.")
    else:
        print("File not found.")

genai.configure(api_key="AIzaSyDHJ6b0-rxuBAQdwn0AiuFoSICgi9AFTls")
model = genai.GenerativeModel('gemini-1.5-pro')

if __name__ == "__main__":
    url = receive_url()
    
    extracted_text = scrape_article_text(url)
    
    if extracted_text:
        save_as_pdf(extracted_text, "scraped_text.pdf")
    else:
        print("Failed to extract article text after multiple attempts.")
        
    pdf_text = read_pdf(pdf_file)
    analysis = f"Based off the following news article:\n{pdf_text}\n\nDetermine the most mentioned publically traded company mentioned if any, and list the name and ticker ONLY and either a POSITIVE or NEGATIVE based off the sentimental analysis of the company. For example, if there was a negative article about Apple, the output would be APPLE (AAPL) - NEGATIVE."
    response = model.generate_content(analysis)
    print(response.text)
    
    delete_pdf(pdf_file)
