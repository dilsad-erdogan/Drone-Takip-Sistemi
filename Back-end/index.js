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

app.use("/flight", require("./routes/flightRoute"));
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

app.post('/api/login', (req, res) => {
  logger.info('User logged in.');
  res.sendStatus(200);
});

app.post('/api/register', (req, res) => {
  logger.info('User registered.');
  res.sendStatus(200);
});

app.put('/user/profile/update/:id', (req, res) => {
  logger.warn('User updated');
  res.sendStatus(200);
});

app.patch('/user/delete/:id', (req, res) => {
  logger.warn('User deleted');
  res.sendStatus(200);
});

const server = http.createServer(app);
const io = require('./socket');
io.attach(server);

server.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
