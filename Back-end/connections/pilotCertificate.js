class PilotCertificate{
    constructor(){
        this.certificate = [];
    }

    async fetchCertificateData(){
        try{
            const response = await fetch('http://localhost:3000/certificate/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.certificate = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async fetchActiveAll(){
        try{
            const response = await fetch('http://localhost:3000/certificate/activeAll');
            
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
            console.log('Hata:', error.message);
        }
    }

    async getCertificateById(certificateId){
        try{
            const response = await fetch(`http://localhost:3000/certificate/${certificateId}`, {
                method: "GET"
            });

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Durum: ${response.status}`);
            }

            const result = await response.json();
            if(!result.success || !result.data){
                throw new Error('API yanıtı beklenen formatta değil.');
            }

            const data = result.data;
            return data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addCertificate(newCertificate){
        try{
            const response = await fetch('http://localhost:3000/certificate/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCertificate),
            });

            if(!response.ok){
                throw new Error('Permission eklenirken bir hata oluştu.');
            }

            await this.fetchCertificateData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async updateCertificate(certificateId, newCertificate){
        try{
            const response = await fetch(`http://localhost:3000/certificate/update/${certificateId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCertificate),
            });

            if(!response.ok){
                throw new Error('Permission güncellenirken hata oldu.');
            }

            await this.fetchCertificateData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deleteCertificate(certificateId){
        try{
            const response = await fetch(`http://localhost:3000/certificate/delete/${certificateId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Permission silinirken bir hata oluştu.');
            }

            await this.fetchCertificateData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getCertificate(){
        return this.certificate;
    }
}