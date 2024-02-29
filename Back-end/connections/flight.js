class Flight{
    constructor(){
        this.flight = [];
    }

    async fetchFlightData(){
        try {
            const response = await fetch('http://localhost:3000/flight/flight/all');
            const flights = await response.json();
            
            this.flight = flights;
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    getFlights(){
        return this.flight;
    }
}

export default Flight;