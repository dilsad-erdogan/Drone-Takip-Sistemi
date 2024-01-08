class Drone{
    constructor(){
        this.drones = [];
    }

    async fetchDroneData() {
        try {
            const response = await fetch('http://localhost:3000/drone/all');
    
            if (!response.ok) {
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }
    
            const responseData = await response.json();
    
            if (!responseData.success || !Array.isArray(responseData.data)) {
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }
    
            this.drones = responseData.data;
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    } //Drone bilgisinin api üzerinden fetch ile çekilmesi

    async fetchTotalDrone(){
        try{
            const response = await fetch('http://localhost:3000/drone/total');
            const data = await response.json();

            console.log('Drone.js gelen data:', data);

            return data;
        } catch(error){
            console.error('Error in fetchTotalDrone:', error.message);
            throw error;
        }
    }

    getDrones() {
        return this.drones;
    }
}

export default Drone;