require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/drone", require("./routes/droneRoute"));
app.use("/api", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/droneBrand", require("./routes/droneBrandRoute"));
app.use("/droneInfo", require("./routes/droneInfoRoute"));
app.use("/droneType", require("./routes/droneTypeRoute"));
app.use("/droneModel", require("./routes/droneModelRoute"));
app.use("/userRole", require("./routes/roleTypeRoute"));

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
});

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`)
});