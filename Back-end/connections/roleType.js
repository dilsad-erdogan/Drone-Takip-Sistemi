class RoleType{
    constructor(){
        this.role = [];
    }

    async fetchUserRoleData() {
        try{
            const response = await fetch('http://localhost:3000/userRole/all');

            if(!response.ok){
                throw new Error(`API isteği başarısız oldu. Status: ${response.status}`);
            }

            const responseData = await response.json();

            if(!responseData.success || !Array.isArray(responseData.data)){
                console.error('API yanıtı beklenen formatta bir dizi içermiyor:', responseData);
                throw new Error('API yanıtı beklenen formatta bir dizi içermiyor.');
            }

            this.role = responseData.data;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async addRole(newRole){
        try{
            const response = await fetch('http://localhost:3000/userRole/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRole),
            });

            if(!response.ok){
                throw new Error('User role eklenirken bir hata oluştu.');
            }

            await this.fetchUserRoleData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async updateRole(roleId, role){
        try{
            const response = await fetch(`http://localhost:3000/userRole/update/${roleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(role),
            });

            if(!response.ok){
                throw new Error('User role güncellenirken bir hata oluştu.');
            }

            await this.fetchUserRoleData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    async deleteUserRole(roleId){
        try{
            const response = await fetch(`http://localhost:3000/userRole/delete/${roleId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('User role silinirken bir hata oluştu.');
            }

            await this.fetchUserRoleData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getUserRole() {
        return this.role;
    }
}

export default RoleType;