class Drone{
    constructor(){
        this.drone = [];
    };

    async fetchDroneData(){
        try{
            const response = await fetch('http://localhost:3000/api/drones');

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const droneData = await response.json();
            this.drone = droneData;
        } catch (error){
            console.error('Hata:', error.message);
        }
    } //Drone bilgisinin api üzerinden fetch ile çekilmesi

    async addDrone(newDrone){
        try{
            const response = await fetch('http://localhost:3000/api/drones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDrone),
            });

            if(!response.ok){
                throw new Error('Drone eklenirken bir hata oluştu.');
            }

            await this.fetchDroneData();
        } catch (error){
            console.error('Hata:', error.message);
        }
    } //Frontendde verilen newDrone bilgisinin api ile tabloya yerleştirilmesi

    async updateDrone(droneId, drone){
        try{
            const response = await fetch(`http://localhost:3000/api/drones/${droneId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(drone),
            });

            if(!response.ok){
                throw new Error('Drone güncellenirken bir hata oluştu.');
            };

            await this.fetchDroneData();
        } catch (error){
            console.error('Hata:', error.message);
        }
    } //Frontendden verilen id ve yeni drone bilgilerinin api ile tabloya yerleştirilmesi

    getDrone(){
        return this.drone;
    } //Drone bilgilerinin getirilmesi
}

export default Drone;