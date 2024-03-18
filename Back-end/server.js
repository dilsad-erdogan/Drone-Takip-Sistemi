require('dotenv').config(); //Projedeki gizli bilgileri güvenli şekilde yönetmeyi sağlar.
const express = require('express');
const app = express(); //Express uygulaması oluşturur
const bodyParser = require('body-parser'); //Gelen HTTP isteklerinin gövdelerini işlemek için kullanılır.
const fs = require('fs'); //Dosya sistemini kullanarak dosya ve dizin işlemleri yapmanıza olanak sağlar
const cors = require('cors'); //Farklı domainlerden gelen isteklere izin vermek için kullanılır.
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
//Express middleware'leri projeye ekler

fs.readdirSync("./routes").map((r) => {
    app.use("/api", require(`./routes/${r}`));
});
//routes dizinindeki tüm dosyaları /api altında kullanılır hale getirir

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

module.exports = app;