import axios from "axios";

class ApiService {
  api = axios.create({
    baseURL: "http://localhost:3001/",
  });

  getSlug() {
    throw new Error("abstract method"); //return "clients";
  }
  async getAll() {
    const response = await this.api.get(this.getSlug()); //"http://localhost:3001/" ("clients")
    return response.data;
  }
  async create(data) {
    const response = await this.api.post(this.getSlug(), data);
    return response.data;
  }
  async delete(id) {
    const response = await this.api.delete(this.getSlug() + "/" + id);
    return response.data;
  }
}

export default ApiService;
