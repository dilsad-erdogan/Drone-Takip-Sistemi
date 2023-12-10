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

    getUsers() {
        return this.users;
    }
}

export default UserModel;