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

    getDroneModel() {
        return this.model;
    }
}

export default DroneModel;