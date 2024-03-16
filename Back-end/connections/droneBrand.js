class DroneBrand {
    constructor() {
        this.brand = [];
    }

    async fetchDroneBrandData() {
        try {
            const response = await fetch('http://localhost:3000/droneBrand/all');

            if (!response.ok) {
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();

            if (!responseData.success || !Array.isArray(responseData.data)) {
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.brand = responseData.data; // Değişiklik burada yapıldı
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addBrand(newBrand){
        console.log(newBrand);
        try{
            const response = await fetch('http://localhost:3000/droneBrand/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBrand),
            });

            if(!response.ok){
                throw new Error('Drone brand eklenirken bir hata oluştu.');
            }

            await this.fetchDroneBrandData();
        }catch (error){
            console.error('Hata:', error.message);
        }
    }

    async updateDrone(brandId, brand){
        try{
            const response = await fetch(`http://localhost:3000/droneBrand/update/${brandId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(brand),
            });

            if(!response.ok){
                throw new Error('Brand bilgileri güncellenirken bir hata oluştu. ');
            }

            await this.fetchDroneBrandData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deleteDroneBrand(brandId){
        try{
            const response = await fetch(`http://localhost:3000/droneBrand/delete/${brandId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Drone brand silinirken bir hata oluştu.');
            }

            await this.fetchDroneBrandData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async droneBrandModel(brandId){
        try {
            const response = await fetch(`http://localhost:3000/droneBrand/addDrone/${brandId}`, {
                method: "GET"
            });
    
            if (!response.ok) {
                throw new Error('API isteği başarısız oldu.');
            }
    
            const result = await response.json();
            if (!result.success || !result.models) {
                throw new Error('API yanıtı beklenen formatta değil.');
            }
    
            const totalData = result.models;
            return totalData;
        } catch(error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async getBrandById(brandId){
        try{
            const response = await fetch(`http://localhost:3000/droneBrand/${brandId}`, {
                method: "GET"
            });

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if(!result.success || !result.data){
                throw new Error('API yanıtı beklenen formatta değil.'); 
            }

            const data = result.data;
            return data;
        } catch(error){
            console.log('Hata:', error.message);
            throw error;
        }
    }

    getDroneBrands() {
        return this.brand;
    }
}

export default DroneBrand;
