from flask import Flask, request, jsonify
from  scrape import *

app = Flask(__name__)

@app.route('/api/url', methods=['POST'])
def receive_url():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    extracted_text = scrape_article_text(url)

    if extracted_text:
        save_as_pdf(extracted_text, "scraped_text.pdf")
        pdf_text = read_pdf("scraped_text.pdf")
        
        analysis_prompt = f"Based off the following news article:\n{pdf_text}\n\nDetermine the most mentioned publicly traded company mentioned if any, and list the name and ticker ONLY and either a POSITIVE or NEGATIVE based off the sentimental analysis of the company. For example, if there was a negative article about Apple, the output would be APPLE (AAPL) - NEGATIVE."
        
        response = model.generate_content(analysis_prompt)
        sentiment_analysis = response.text.strip()

        delete_pdf("scraped_text.pdf")
        
        return jsonify({"result": sentiment_analysis})
    else:
        return jsonify({"error": "Failed to extract text"}), 500

if __name__ == "__main__":
    app.run(debug=True)
