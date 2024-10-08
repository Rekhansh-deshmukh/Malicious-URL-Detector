from flask import Flask, render_template, request, jsonify
import re 
import joblib
app = Flask(__name__)
model = joblib.load('random_forest_model.pkl','rb')
def is_valid_url(url):
    regex = re.compile(
        r'^(http|https|ftp)://[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,4})(:[0-9]+)?(/.*)?$')
    return re.match(regex, url)
@app.route('/predict', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        url = data.get('url')
        if is_valid_url(url):
            prediction = model.get_prediction_from_url(url)
            if (prediction== 'benign(safe)'):
                return render_template('index.html',predi = 'benign')
            if(prediction == "Malware"):
                render_template('index.html',predi= 'malware')
            if(prediction =="defacement"):
                render_template('index.html',predi= 'defacement')
            if(prediction == "phishing "):
                render_template('index.html',predi= 'phising')
            else :
                return render_template('index.html',predi= 'cannot predict(unsafe)')
        else:
            return render_template('index.html', error='Invalid URL')

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
