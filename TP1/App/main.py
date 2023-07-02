from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return "<p>Hello world</p>"

@app.route("/home")
def candidats():
    return render_template('home.html', name = "Polo")

@app.route("/list")
def list_candidats():
    ##list = ['Polo', 'Jeannot']
    ##return render_template('candidats.html', list = list)
    return render_template('votes.html')

@app.route("/votes")
def list_votes():
    list = {"Polo":5, "Jeannot":12}
    return render_template('candidats.html', list = list)
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)