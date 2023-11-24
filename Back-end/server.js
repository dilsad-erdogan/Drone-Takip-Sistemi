const express = require('express');
const userRouters = require('./src/users/routes');
const droneRouters = require('./src/drone/routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1/users', userRouters);
app.use('/api/v1/drones', droneRouters);

app.listen(port, () => console.log(`app listening on port ${port}`));