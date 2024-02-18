from flask import Flask
from stt import getSTT

app = Flask(__name__)

@app.route("/papi/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/papi/stt/<file>")
def getFileSTT(file):
    print("yooo")
    response="<p>HUH"
    try:
        response += getSTT(str(file))
        print(response)
    except:
        print("Something went wrong with stt")
    return response
