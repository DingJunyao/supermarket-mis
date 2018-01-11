import json
from flask import Flask,jsonify
app = Flask(__name__)
from utily import numbering
from utily import goods



@app.route('/<type>')
def hello_world(type):
    return jsonify(numbering.numbering(type))

@app.route('/goods/')
def show_goods():
    return json.dumps(goods.showall(), ensure_ascii=False)

if __name__ == '__main__':
    app.run()

    # host='0.0.0.0'