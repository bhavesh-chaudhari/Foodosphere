from flask import Flask, jsonify, request, make_response,render_template, send_from_directory
from flask_cors import CORS


app = Flask(__name__,static_url_path='')
CORS(app)


@app.route('/src/<path:path>')
def send_js(path):
    return send_from_directory('src', path)

@app.route("/")
def home_page():
    return render_template('index.html')

@app.route("/about.html")
def about_page():
    return render_template('about.html')

@app.route("/form.html")
def subscribe_page():
    return render_template('form.html')


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", threaded=True)