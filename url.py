from flask import Flask, request, jsonify
from scrape import *

app = Flask(__name__)

@app.route('/api/url', methods=['POST'])
def receive_url():
    data = request.get_json()
    url = data.get('url', '')
    
    print(f"Received URL: {url}")
    
    return jsonify(url), 200

if __name__ == '__main__':
    app.run(debug=True)
