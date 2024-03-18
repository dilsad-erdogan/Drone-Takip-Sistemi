const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 3000;
const { expressWinstonLogger, logger } = require('./controllers/logController');

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

app.post('/api/login', (req, res) => {
  logger.info('User logged in.');
  res.sendStatus(200);
});

app.post('/api/register', (req, res) => {
  logger.info('User registered.');
  res.sendStatus(200);
});

app.put('/user/profile/update/:id', (req, res) => {
  logger.warn('User updated.');
  res.sendStatus(200);
});

app.patch('/user/delete/:id', (req, res) => {
  logger.warn('User deleted.');
  res.sendStatus(200);
});

app.post('/drone/add', (req, res) => {
  logger.warn('Drone added.');
  res.sendStatus(200);
});

app.put('/drone/update/:id', (req, res) => {
  logger.warn('Drone updated.');
  res.sendStatus(200);
});

app.patch('/drone/delete/:id', (req, res) => {
  logger.warn('Drone deleted.');
  res.sendStatus(200);
});

app.post('/droneBrand/add', (req, res) => {
  logger.warn('Drone Brand added.');
  res.sendStatus(200);
});

app.put('/droneBrand/update/:id', (req, res) => {
  logger.warn('Drone Brand updated.');
  res.sendStatus(200);
});

app.patch('/droneBrand/delete/:id', (req, res) => {
  logger.warn('Drone Brand deleted.');
  res.sendStatus(200);
});

app.post('/droneInfo/add', (req, res) => {
  logger.warn('Drone Info added.');
  res.sendStatus(200);
});

app.put('/droneInfo/update/:id', (req, res) => {
  logger.warn('Drone Info updated.');
  res.sendStatus(200);
});

app.patch('/droneInfo/delete/:id', (req, res) => {
  logger.warn('Drone Info deleted.');
  res.sendStatus(200);
});

app.post('/droneModel/add', (req, res) => {
  logger.warn('Drone Model added.');
  res.sendStatus(200);
});

app.put('/droneModel/update/:id', (req, res) => {
  logger.warn('Drone Model updated.');
  res.sendStatus(200);
});

app.patch('/droneModel/delete/:id', (req, res) => {
  logger.warn('Drone Model deleted.');
  res.sendStatus(200);
});

app.post('/droneType/add', (req, res) => {
  logger.warn('Drone Type added.');
  res.sendStatus(200);
});

app.put('/droneType/updated/:id', (req, res) => {
  logger.warn('Drone Type updated.');
  res.sendStatus(200);
});

app.patch('/droneType/delete/:id', (req, res) => {
  logger.warn('Drone Type deleted.');
  res.sendStatus(200);
});

app.post('/userRole/add', (req, res) => {
  logger.warn('User role added.');
  res.sendStatus(200);
});

app.put('/userRole/update/:id', (req, res) => {
  logger.warn('User role updated.');
  res.sendStatus(200);
});

app.patch('/userRole/delete/:id', (req, res) => {
  logger.warn('User role deleted.');
  res.sendStatus(200);
});

app.post('/flight/flight', (req, res) => {
  logger.warn('Flight added.');
  res.sendStatus(200);
});

app.put('/flight/flight/:flightId/coordinates', (req, res) => {
  logger.warn('Flight updated.');
  res.sendStatus(200);
});

const server = http.createServer(app);
const io = require('./socket');
io.attach(server);

server.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});