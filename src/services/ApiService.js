import axios from "axios";

class ApiService {
  api = axios.create({
    baseURL: "http://localhost:3001/",
  });

  getSlug() {
    throw new Error("abstract method");
  }
  async getAll() {
    const response = await this.api.get(this.getSlug());
    return response.data;
  }
  async create(data) {
    const response = await this.api.post(this.getSlug(), data);
    return response.data;
  }
}

export default ApiService;
