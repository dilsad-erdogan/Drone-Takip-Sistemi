class DroneType{
    constructor(){
        this.type = [];
    }

    async fetchDroneTypeData() {
        try {
            const response = await fetch('http://localhost:3000/droneType/all');
    
            if (!response.ok) {
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
    
            if (!responseData.success || !Array.isArray(responseData.data)) {
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }
    
            this.type = responseData.data;
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addType(newType){
        try{
            const response = await fetch('http://localhost:3000/droneType/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newType),
            });

            if(!response.ok){
                throw new Error('Drone type eklenirken bir hata oluştu.');
            }

            await this.fetchDroneTypeData();
        }catch (error){
            console.error('Hata:', error.message);
        }
    }

    async updateType(typeId, type){
        try{
            const response = await fetch(`http://localhost:3000/droneType/update/${typeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(type),
            });

            if(!response.ok){
                throw new Error('Drone type güncellenirken bir hata oluştu.');
            };

            await this.fetchDroneTypeData();
        } catch(error) {
            console.error('Hata:', error.message);
        }
    }

    async deleteDroneType(typeId){
        try{
            const response = await fetch(`http://localhost:3000/droneType/delete/${typeId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Drone type silinirken bir hata oluştu.');
            }

            await this.fetchDroneTypeData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async getTypeById(typeId){
        try {
            const response = await fetch(`http://localhost:3000/droneType/${typeId}`, {
                method: "GET"
            });
    
            if (!response.ok) {
                // API isteği başarısız olursa hata fırlat
                throw new Error(`API isteği başarısız oldu. Durum: ${response.status}`);
            }
    
            const result = await response.json();
            if (!result.success || !result.data) {
                throw new Error('API yanıtı beklenen formatta değil.');
            }
    
            const data = result.data;
            return data;
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }

    getDroneTypes() {
        return this.type;
    }
}

export default DroneType;