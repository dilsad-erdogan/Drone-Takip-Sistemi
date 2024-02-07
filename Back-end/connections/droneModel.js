class DroneModel{
    constructor(){
        this.model = [];
    }

    async fetchDroneModelData() {
        try{
            const response = await fetch('http://localhost:3000/droneModel/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();

            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.model = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addModel(newModel){
        try{
            const response = await fetch('http://localhost:3000/droneModel/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newModel),
            });

            if(!response.ok){
                throw new Error('Drone model eklenirken bir hata oluştu.');
            }

            await this.fetchDroneModelData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async updateModel(modelId, model){
        try{
            const response = await fetch(`http://localhost:3000/droneModel/update/${modelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(model),
            });

            if(!response.ok){
                throw new Error('Drone model güncellenirken bir hata oluştu.');
            }

            await this.fetchDroneModelData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deleteDroneModel(modelId){
        try{
            const response = await fetch(`http://localhost:3000/droneModel/delete/${modelId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Drone model silinirken bir hata oluştu.');
            }

            await this.fetchDroneModelData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async getModelById(modelId) {
        try {
            const response = await fetch(`http://localhost:3000/droneModel/${modelId}`, {
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

    getDroneModel() {
        return this.model;
    }
}

export default DroneModel;