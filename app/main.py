# save this as app.py
from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route("/")
def hello() -> str:
    return render_template('index.html')
