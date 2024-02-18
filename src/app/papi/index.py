from flask import Flask, request
from stt import getSTT
from sttOpenai import getQuestions

app = Flask(__name__)

@app.route("/papi/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/papi/stt/", methods=['POST'])
def getFileSTT():
    response=""
    req = request.get_json()
    try:
        response += getQuestions(getSTT(str(req['ln'])))
        print(response)
    except:
        print("Something went wrong with stt")
    return {'response':response}

