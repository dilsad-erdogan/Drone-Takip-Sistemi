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
    } //Drone bilgisinin api üzerinden fetch ile çekilmesi

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
    } //Frontendde verilen newUser bilgisinin api ile tabloya yerleştirilmesi

    async updateUser(userId, user){
        try{
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if(!response.ok){
                throw new Error('Kullanıcı güncellenirken bir hata oluştu.');
            };

            await this.fetchUserData();
        } catch (error){
            console.error('Hata:', error.message);
        }
    } //Frontendden verilen id ve yeni user bilgilerinin api ile tabloya yerleştirilmesi

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
    } //Frontendden verilen id değerinin fetch ile tablodan silinmesi

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
    } //Frontendden alınan login bilgilerinin token üreterek user sayfasına giriş yapabilmesi

    getUsers() {
        return this.users;
    } //User bilgilerinin getirilmesi
}

export default User;