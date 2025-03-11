from flask import Flask, request, jsonify
import requests
import time

app = Flask(__name__)

# Fetch external data for O-Level and A-Level
def fetch_academic_data(query):
    try:
        response = requests.get(f"https://www.wikipedia.org/w/index.php?search={query}")
        return response.url  # Returns the Wikipedia link
    except:
        return "I couldn't fetch the data at the moment."

@app.route('/respond', methods=['POST'])
def respond():
    user_message = request.json['message']
    time.sleep(0.01)  # Simulating fast response time
    
    if "O-Level" in user_message or "A-Level" in user_message:
        reply = f"Here's some academic help: {fetch_academic_data(user_message)}"
    else:
        reply = generate_reply(user_message)
    
    return jsonify({'reply': reply})

def generate_reply(message):
    return f"Response to: {message}"

if __name__ == '__main__':
    app.run(debug=True)
