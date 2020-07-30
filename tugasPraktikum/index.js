const express = require("express")
const bodyparse = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended: true }))
app.use(cors())

app.listen(8000, () => {
    console.log("Server run on port 8000");
})

// TUGAS PRAKTIKUM REST API NODE JS
console.log("-------------------------------------------------")
console.log("--------TUGAS PRAKTIKUM REST API NODE JS---------")

// NOMOR 1
// end-point VOLUME dan LUAS PERMUKAAN BIDANG RUANG 

// end-point bangunRuang dengan method GET 
app.get("/balok/:panjang/:lebar/:tinggi", (req,res) => {
    let panjang = req.params.panjang
    let lebar = req.params.lebar
    let tinggi = req.params.tinggi
    let volume = panjang * lebar * tinggi
    let luasPermukaaan = 2 * panjang * lebar + 2 * panjang * tinggi + 
                         2 * lebar * tinggi

    let response = {
        panjang: panjang,
        lebar: lebar,
        tinggi: tinggi,
        volume: volume, 
        luasPermukaaan: luasPermukaaan
    }
     res.json(response)
})

app.get("/bola/:radius", (req,res) => {
    let radius = req.params.radius
    let volume = 4/3 * 3.14 * radius**2 * radius
    let luasPermukaaan = 4 * 3.14 * radius**2

    let response = {
        radius: radius,
        volume: volume, 
        luasPermukaaan: luasPermukaaan
    }
     res.json(response)
})

// end-point bangunRuang dengan method POST
app.post("/tabung", (req,res) => {
    let radius = Number(req.body.radius)
    let tinggi = Number(req.body.tinggi)
    let volume = 3.14 * radius**2 * tinggi
    let luasPermukaaan = (2 * 3.14 * radius**2) + (2 * 3.14 * radius) 

    let response = {
        radius: radius,
        tinggi: tinggi,
        volume: volume,
        luasPermukaaan: luasPermukaaan
    }
    res.json(response)
})

app.post("/kerucut", (req,res) => {
    let radius = Number(req.body.radius)
    let tinggi = Number(req.body.tinggi)
    let sisiMiring = Number(req.body.sisiMiring)
    let volume = 1/3 * 3.14 * radius**2 * tinggi
    let luasPermukaaan = 3.14 * radius * sisiMiring + 3.14 * radius**2 

    let response = {
        radius: radius,
        tinggi: tinggi,
        sisiMiring: sisiMiring,
        volume: volume,
        luasPermukaaan: luasPermukaaan
    }
    res.json(response)
})

app.post("/kubus", (req,res) => {
    let sisi = Number(req.body.sisi)
    let volume = sisi * sisi
    let luasPermukaaan = 6 * sisi * sisi

    let response = {
        sisi: sisi,
        volume: volume,
        luasPermukaaan: luasPermukaaan
    }
    res.json(response)
})


// NOMOR 2

// mengkonversikan suhu
app.get("/convert/:jenis/:number", (req,res) => {
    let jenis = req.params.jenis
    let number = req.params.number

    let result = (j,n) => {
        if (j == "celcius") {
            let r = {
                "reamur": (4/5) * n,
                "fahrenheit": (9/5) * n + 32,
                "kelvin": (5/5 * n) + 273
            }
            return r
        }else if (j == "reamur") {
            let r = {
                "celcius": (5/4) * n,
                "fahrenheit": (9/4) * n + 32,
                "kelvin": (5/4) * n + 273
            }
            return r
        }else if (j == "fahrenheit") {
            let r = {
                "celcius": (5/9) * (n - 32),
                "reamur": (4/9) * (n - 32),
                "kelvin": 5/9 * (n - 32) + 273
            }
            return r
        }else if (j == "kelvin") {
            let r = {
                "celcius": (5/5 * n) - 273.15,
                "fahrenheit": (9 / 5) * (n - 273.15) + 32,
                "reamur": 4 / 5 * (n - 273.15)
            }
            return r
        }
    }
    
    let response = {
        jenisSuhu: jenis,
        nilai: number,
        result: result(jenis, number)
    }
    res.json(response)
})


// -------NOMOR 3--------

// mengkonversikan suhu
app.post("/convert/desimal", (req,res) => {
    let desimal = Number(req.body.nilai)

    let biner = desimal.toString(2)
    let octal = desimal.toString(8)
    let hexa  = desimal.toString(16)

    let r = {
        dariBilangan: "DESIMAL",
        value: desimal,
        biner: biner,
        octal: octal,
        heksadesimal: hexa
    }
    res.json(r)
})

app.post("/convert/biner", (req,res) => {
    let biner = Number(req.body.nilai)

    let desimal = biner.toString(10)
    let octal = biner.toString(8)
    let hexa  = biner.toString(16)

    let r = {
        dariBilangan: "BINER",
        value: biner,
        desimal: desimal,
        octal: octal,
        heksadesimal: hexa
    }
    res.json(r)
})

app.post("/convert/octal", (req,res) => {
    let octal = Number(req.body.nilai)

    let desimal = octal.toString(10)
    let biner = octal.toString(2)
    let hexa  = octal.toString(16)

    let r = {
        dariBilangan: "OCTAL",
        value: octal,
        desimal: desimal,
        biner: biner,
        heksadesimal: hexa
    }
    res.json(r)
})

app.post("/convert/hexadesimal", (req,res) => {
    let hexadesimal = Number(req.body.nilai)

    let desimal = hexadesimal.toString(10)
    let biner = hexadesimal.toString(2)
    let octal  = hexadesimal.toString(8)

    let r = {
        dariBilangan: "HEXADESIMAL",
        value: hexadesimal,
        desimal: desimal,
        biner: biner,
        octal: octal
    }
    res.json(r)
})

// ------NOMOR 4-------

// menghitung BMI --end-point BMI--
app.post("/bmi", (req,res) => {
    let tinggi = Number(req.body.tinggi)
    let berat = Number(req.body.berat)

    let BMI = berat/(tinggi**2)
    let status
        if (BMI < 18.5){
           status = "Kekurangan berat badan"
        }else if(BMI >= 18.5 && BMI < 24.9){
            status = "Normal (ideal)"
        }else if(BMI >= 25 && BMI < 29.9){
            status ="Kelebihan berat badan"
        }else{
            status = "Kegemukan (Obesitas)"
        }

    let response = {
        tinggi: tinggi,
        berat: berat,
        bmi: BMI,
        status: status
    }
    res.json(response)
})
