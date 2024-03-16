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

    async addDrone(newDrone){
        try{
            const response = await fetch('http://localhost:3000/drone/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDrone),
            });

            if(!response.ok){
                throw  new Error('Drone eklenirken bir hata oluştu.');
            }

            await this.fetchDroneData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async fetchTotalDrone(){
        try{
            const response = await fetch('http://localhost:3000/drone/total');
            const data = await response.json();

            return data;
        } catch(error){
            console.error('Error in fetchTotalDrone:', error.message);
            throw error;
        }
    }

    async fetchTotalUserDrone(userId){
        try{
            const response = await fetch(`http://localhost:3000/drone/userdrone/${userId}`);
            const data = await response.json();

            return data;
        }catch(error){
            console.log('Error in fetchTotalUserDrone:', error.message);
            throw error;
        }
    }

    async deleteDrone(droneId){
        try{
            const response = await fetch(`http://localhost:3000/drone/delete/${droneId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Drone silinirken bir hata oluştu.');
            }

            await this.fetchDroneData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async allDrone(){
        try{
            const response = await fetch('http://localhost:3000/drone/droneAndInfo/all', {
                method: "GET"
            });

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if(!result.success || !result.drones){
                throw new Error('API yanıtı beklenen formatta değil.');
            }

            const totalData = result.drones;
            return totalData;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    getDrones() {
        return this.drones;
    }
}

export default Drone;