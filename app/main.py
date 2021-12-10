from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index() -> str:
    return render_template('index.html')


@app.route("/parking/<parking_id>")
def show_parking(parking_id) -> str:
    return render_template('parking.html', parking_id=parking_id)
