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

    getPilot(){
        return this.pilot;
    }
}

export default Pilot;