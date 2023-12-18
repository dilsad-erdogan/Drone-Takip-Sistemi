class User{
    constructor(){
        this.users = [];
    }

    async fetchUserData(){
        try{
            const response = await fetch('http://localhost:3000/api/users');

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
            const response = await fetch('http://localhost:3000/api/users', {
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
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
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

    async loginUser(credentials) {
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Giriş sırasında bir hata oluştu.');
            }

            const { message, token } = await response.json();
            console.log(message);
            console.log(token);
            return token;
        } catch (error) {
            console.error('Hata:', error.message);
        }
    }

    getUsers() {
        return this.users;
    }
}

export default User;