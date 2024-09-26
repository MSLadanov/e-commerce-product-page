import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async fetchData(endpoint : string, token? : string) {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; 
    }
  }

  async postData(endpoint : string , data : {}, token? : string) {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      return response.data; 
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

class SneakerService extends ApiService {
  async getSneakers() {
    return await this.fetchData('sneaker');
  }

}

class UserService extends ApiService {
  async getUser(token : string) {
    return await this.fetchData('user/info/', token);
  }

  async signIn(data : {}){
    return await this.postData('user/login/', data)
  }

  async signUp(user : {} ) {
    return await this.postData('users', user);
  }

}

export const sneakerService = new SneakerService();
export const userService = new UserService();