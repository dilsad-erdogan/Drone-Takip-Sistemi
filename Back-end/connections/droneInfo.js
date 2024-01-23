class DroneInfo{
    constructor(){
        this.info = [];
    }

    async fetchDroneInfoData() {
        try {
            const response = await fetch('http://localhost:3000/droneInfo/all');
    
            if (!response.ok) {
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }
    
            const responseData = await response.json();
    
            if (!responseData.success || !Array.isArray(responseData.data)) {
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }
    
            this.info = responseData.data;
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addInfo(newInfo){
        try{
            const response = await fetch('http://localhost:3000/droneInfo/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaiton/json',
                },
                body: JSON.stringify(newInfo),
            });

            if(!response.ok){
                throw new Error('Drone info eklenirken bir hata oluştu.');
            }

            await this.fetchDroneInfoData();
        }catch (error){
            console.error('Hata:', error.message);
        }
    }

    async deleteDroneInfo(infoId){
        try{
            const response = await fetch(`http://localhost:3000/drone/delete/${infoId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Drone info silinirken bir hata oluştu.');
            }

            await this.fetchDroneInfoData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getDroneInfo() {
        return this.info;
    }
}

export default DroneInfo;