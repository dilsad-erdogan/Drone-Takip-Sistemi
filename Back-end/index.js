const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 3000;
const { expressWinstonLogger } = require('./controllers/logController');

require('dotenv').config()
var connectDB = require("./config/mongoDb");
connectDB()

const app = express();
app.use(cors());
app.use(expressWinstonLogger);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/drone", require("./routes/droneRoute"));
app.use("/droneBrand", require("./routes/droneBrandRoute"));
app.use("/droneInfo", require("./routes/droneInfoRoute"));
app.use("/droneModel", require("./routes/droneModelRoute"));
app.use("/droneType", require("./routes/droneTypeRoute"));
app.use("/userRole", require("./routes/roleTypeRoute"));
app.use("/flight", require("./routes/flightRoute"));
app.use("/permission", require("./routes/permissionRoute"));
app.use("/pilot", require("./routes/pilotRoute"));
app.use("/certificate", require("./routes/pilotCertificateRoute"));
app.use("/certificatePermission", require("./routes/certificatePermissionRoute"));

app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("Homepage");
});

const server = http.createServer(app);
const io = require('./socket');
io.attach(server);

server.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});