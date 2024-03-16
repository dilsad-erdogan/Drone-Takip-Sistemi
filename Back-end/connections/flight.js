class Flight{
    constructor(){
        this.flight = [];
    }

    async fetchFlightData(){
        try {
            const response = await fetch('http://localhost:3000/flight/flight/all');
            const flights = await response.json();
            
            this.message = flights;
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    async addFlight(newFlight){
        try{
            const response = await fetch('http://localhost:3000/flight/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFlight),
            });

            if(!response.ok){
                throw new Error('Flight eklenirken bir hata oluştu.');
            }

            await this.fetchFlightData();
        } catch(error){
            console.error('Hata:', error);
        }
    }

    async updateFlight(flightId, flight){
        try{
            const response = await this.fetch(`http://localhost:3000/flight/flight/${flightId}/coordinates`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flight),
            });

            if(!response.ok){
                throw new Error('Flight güncellenirken bir hata oluştu.');
            };

            await this.fetchFlightData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async fetchTotalFlight() {
        try{
            const response = await fetch('http://localhost:3000/flight/total');
            const data = await response.json();

            return data;
        } catch(error){
            console.error('Error in fetchTotalUser', error.message);
            throw error;
        }
    }

    getFlights(){
        return this.flight;
    }
}

export default Flight;