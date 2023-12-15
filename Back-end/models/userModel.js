class UserModel{
    constructor(){
        this.users = [];
    }

    async fetchUserData(){
        try{
            const response = await fetch('http://localhost:3000/api/v1/users');

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const userData = await response.json();
            this.users = userData;
        } catch (error) {
            console.error('Hata:', error.message);
        }
    }

    async addUser(newUser){
        try{
            const response = await fetch('http://localhost:3000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if(!response.ok){
                throw new Error('Kullanıcı eklenirken bir hata oluştu.');
            }

            await this.fetchUserData();
        }catch (error){
            console.error('Hata:', error.message);
        }
    }

    async deleteUser(userId){
        try{
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
                method: "DELETE"
            });

            if(!response.ok){
                throw new Error('Kullanıcı silinirken bir hata oluştu.');
            }

            await this.fetchUserData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    }

    getUsers() {
        return this.users;
    }
}

export default UserModel;