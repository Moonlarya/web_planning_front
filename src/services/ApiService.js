import axios from "axios";

class ApiService {
  api = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? window.location.origin + "/"
        : "http://localhost:3001/",
  });

  getSlug() {
    throw new Error("abstract method");
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
  async update(id, data) {
    const response = await this.api.put(this.getSlug() + "/" + id, data);
    return response.data;
  }
  async get(id) {
    const response = await this.api.get(this.getSlug() + "/" + id);
    return response.data;
  }
}

export default ApiService;
