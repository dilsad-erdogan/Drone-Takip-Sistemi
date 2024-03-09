class User{
    constructor(){
        this.users = [];
    }

    async fetchUserData() {
        try {
            const response = await fetch('http://localhost:3000/user/all');
    
            if (!response.ok) {
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if (!result.success || !Array.isArray(result.data)) {
              throw new Error('API yanıtı beklenen formatta değil.');
            }
            const userData = result.data;
            
            // Burada userData'nın bir dizi olduğunu kontrol et
            if (Array.isArray(userData)) {
                this.users = userData;
            } else {
                throw new Error('API tarafından dönen veri bir dizi değil.');
            }
        } catch (error) {
            console.error('Hata:', error.message);
            throw error; // Hata durumunda çağıran tarafına da bilgi ver
        }
    } //User bilgisinin api üzerinden fetch ile çekilmesi

    async addUser(newUser){
        try{
            const response = await fetch('http://localhost:3000/api/register', {
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
            const response = await fetch(`http://localhost:3000/user/profile/update/${userId}`, {
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
            const response = await fetch(`http://localhost:3000/user/delete/${userId}`, {
                method: "PATCH"
            });

            if(!response.ok){
                throw new Error('Kullanıcı silinirken bir hata oluştu.');
            }

            await this.fetchUserData();
        } catch(error){
            console.error('Hata:', error.message);
        }
    } //Frontendden verilen id değerinin fetch ile tablodan silinmesi

    async getUserById(userId){
        try{
            const response = await fetch(`http://localhost:3000/user/${userId}`, {
                method: "GET"
            });

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if(!result.success || !result.data) {
                throw new Error('API yanıtı beklenen formatta değil.');
            }

            const userData = result.data;
            return userData;
        } catch (error){
            console.error('Hata:', error.message);
            throw error;
        }
    } //Frontendden verilen id değerinin fetch ile tablodan çekilmesi

    async getDroneById(userId){
        try{
            const response = await fetch(`http://localhost:3000/user/droneById/${userId}`, {
                method: "GET"
            });

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if(!result.success || !result.drones){
                throw new Error('API yanıtı beklenen formatta değil.');
            }

            const totalData = result.drones;
            return totalData;
        } catch(error){
            console.error('Hata:', error.message);
            throw error;
        }
    }

    async loginUser(credentials) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`Giriş sırasında bir hata oluştu. Hata: ${errorMessage}`);
                throw new Error("Invalid email or password");
            }
    
            const responseData = await response.json();
            console.log(responseData);

            const { user, token } = responseData;
            const id = user.user_id;
            const role = user.roletype_id;
            return { id, role, token };
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    }
    
    async fetchTotalUser() {
        try {
          const response = await fetch('http://localhost:3000/user/total');
          const data = await response.json();

          return data;
        } catch (error) {
          console.error('Error in fetchTotalUser:', error.message);
          throw error;
        }
    }
    
    async getUserByName(userId){
        try{
            const response = await fetch(`http://localhost:3000/user/name/${userId}`, {
                method: "GET"
            });

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const result = await response.json();
            if(!result.success || !result.data) {
                throw new Error('API yanıtı beklenen formatta değil.');
            }

            const userData = result.data;
            return userData;
        } catch (error){
            console.error('Hata:', error.message);
            throw error;
        }
    }
    
    getUsers() {
        return this.users;
    } //User bilgilerinin getirilmesi
}

export default User;