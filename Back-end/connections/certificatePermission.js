class CertificatePermission{
    constructor(){
        this.certificatePermission = [];
    }

    async fetchCertificatePermissionData(){
        try{
            const response = await fetch('http://localhost:3000/certificatePermission/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.certificatePermission = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async fetchActiveAll(){
        try{
            const response = await fetch('http://localhost:3000/certificatePermission/activeAll');
            
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

    async getCertificatePermissionById(certificatePermissionId){
        try{
            const response = await fetch(`http://localhost:3000/certificatePermission/${certificatePermissionId}`, {
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

    async getTotalCertificatePermissionCount(){
        try{
            const response = await fetch('http://localhost:3000/certificatePermission/total');
            const data = await response.json();

            return data;
        } catch(error){
            console.log('Hata:', error.message);
        }
    }

    async addCertificatePermission(newCertificatePermission){
        try{
            const response = await fetch('http://localhost:3000/certificatePermission/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCertificatePermission),
            });

            if(!response.ok){
                throw new Error('Certificate permission eklenirken bir hata oluştu.');
            }

            await this.fetchCertificatePermissionData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deleteCertificatePermission(certificatePermissionId){
        try{
            const response = await fetch(`http://localhost:3000/certificatePermission/delete/${certificatePermissionId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Certificate permission silinirken bir hata oluştu.');
            }

            await this.fetchCertificatePermissionData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getCertificatePermission(){
        return this.certificatePermission;
    }
}

export default CertificatePermission;