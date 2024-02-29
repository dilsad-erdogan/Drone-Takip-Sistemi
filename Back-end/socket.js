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
        const response = await fetch('http://localhost:3000/flight/flight/all');
        const flights = await response.json();
        
        socket.emit('flights', flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
    }

    socket.on('addFlight', async (flight) => {
        try{
            const response = await fetch('http://localhost:3000/flight/flight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flight),
            });

            if(!response.ok){
                throw new Error('Flight eklenirken hata oluştu.');
            }
        } catch(error){
            console.error('Hata:', error.message);
        }
    })
});

module.exports = io;