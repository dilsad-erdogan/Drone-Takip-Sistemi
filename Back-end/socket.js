const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => {
    try {
        const response = await fetch('http://localhost:3000/flight/flight');
        const flights = await response.json();
        
        socket.emit('flights', flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
    }
});

module.exports = io;