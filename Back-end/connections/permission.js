class Permission{
    constructor(){
        this.permission = [];
    }

    async fetchPermissionData(){
        try{
            const response = await fetch('http://localhost:3000/permission/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();
            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.permission = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async fetchActiveAll(){
        try{
            const response = await fetch('http://localhost:3000/permission/activeAll');
            
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

    async getTotalPermissionCount(){
        try{
            const response = await fetch('http://localhost:3000/permission/total');
            const data = await response.json();

            return data;
        } catch(error){
            console.log('Hata:', error.message);
        }
    }

    async getPermissionById(permissionId){
        try{
            const response = await fetch(`http://localhost:3000/permission/${permissionId}`, {
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

    async getPermissionUserById(permissionId){
        try{
            const response = await fetch(`http://localhost:3000/permission/userById/${permissionId}`, {
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

    async addPermission(newPermission){
        try{
            const response = await fetch('http://localhost:3000/permission/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPermission),
            });

            if(!response.ok){
                throw new Error('Permission eklenirken bir hata oluştu.');
            }

            await this.fetchPermissionData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async updatePermission(permissionId, newPermission){
        try{
            const response = await fetch(`http://localhost:3000/permission/update/${permissionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPermission),
            });

            if(!response.ok){
                throw new Error('Permission güncellenirken hata oldu.');
            }

            await this.fetchPermissionData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deletePermission(permissionId){
        try{
            const response = await fetch(`http://localhost:3000/permission/delete/${permissionId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Permission silinirken bir hata oluştu.');
            }

            await this.fetchPermissionData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getPermission(){
        return this.permission;
    }
}

export default Permission;