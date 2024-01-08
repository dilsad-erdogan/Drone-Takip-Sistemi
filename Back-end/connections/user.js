class User{
    constructor(){
        this.users = [];
    }

    async fetchUserData() {
        try {
            const response = await fetch('http://localhost:3000/user/users');
    
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
            const response = await fetch(`http://localhost:3000/user/users/${userId}/delete`, {
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
                const errorMessage = await response.text(); // Hata mesajını al
                throw new Error(`Giriş sırasında bir hata oluştu. Hata: ${errorMessage}`);
            }

            const { user, token } = await response.json();
            const id = user.user_id;
            const role = user.roletype_id;
            console.log(role);
            return { id, role, token };
        } catch (error) {
            console.error('Hata:', error.message);
            throw error;
        }
    } //Frontendden alınan login bilgilerinin token üreterek user sayfasına giriş yapabilmesi

    async fetchTotalUser() {
        try {
          const response = await fetch('http://localhost:3000/user/users/total');
          const data = await response.json();

          console.log('User.js gelen data:', data);

          return data;
        } catch (error) {
          console.error('Error in fetchTotalUser:', error.message);
          throw error;
        }
      }      
    
    getUsers() {
        return this.users;
    } //User bilgilerinin getirilmesi
}

export default User;