import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async fetchData(endpoint : string) {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; 
    }
  }

  async postData(endpoint : string , data : {}) {
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
    return await this.fetchData('tasks');
  }

}

class UserService extends ApiService {
  async getUser() {
    return await this.fetchData('users');
  }

  async createUser(user : {}) {
    return await this.postData('users', user);
  }

}

export const taskService = new SneakerService();
export const userService = new UserService();