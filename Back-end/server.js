const express = require('express');
const routers = require('./src/routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1', routers);

app.listen(port, () => console.log(`app listening on port ${port}`));