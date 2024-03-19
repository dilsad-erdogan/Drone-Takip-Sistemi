class Pilot{
    constructor(){
        this.pilot = [];
    }

    async fetchPilotData(){
        try{
            const response = await fetch('http://localhost:3000/pilot/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.pilot = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async fetchActiveAll(){
        try{
            const response = await fetch('http://localhost:3000/pilot/activeAll');
            
            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            return responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
        }
    }
    
    async getTotalPilotCount(){
        try{
            const response = await fetch('http://localhost:3000/pilot/total');
            const data = await response.json();

            return data;
        } catch(error){
            console.log('Hata:', error.message);
        }
    }

    async addPilot(newPilot){
        try{
            const response = await fetch('http://localhost:3000/pilot/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPilot),
            });

            if(!response.ok){
                throw new Error('Pilot eklenirken bir hata oluştu.');
            }

            await this.fetchPilotData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deletePilot(pilotId){
        try{
            const response = await fetch(`http://localhost:3000/pilot/delete/${pilotId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Pilot silinirken bir hata oluştu.');
            }

            await this.fetchPilotData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getPilot(){
        return this.pilot;
    }
}

export default Pilot;