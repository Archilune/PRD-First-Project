from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Data simulasi
data_kantin = {
    "occupied_count": 0,
    "max_capacity": 50,
    "meja": {
        "K1-05": "KOSONG"
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', data=data_kantin)

# API untuk mengubah status saat tombol diklik
@app.route('/konfirmasi_bayar', methods=['POST'])
def konfirmasi_bayar():
    # Logika: Jika meja masih kosong, tambah count
    if data_kantin["meja"]["K1-05"] == "KOSONG":
        data_kantin["meja"]["K1-05"] = "TERISI"
        data_kantin["occupied_count"] += 1
    return jsonify(success=True)

if __name__ == '__main__':
    # Tambahin port=3000 biar sesuai sama screenshot error kamu tadi
    app.run(debug=True, port=3000)