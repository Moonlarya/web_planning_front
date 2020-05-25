import ApiService from "./ApiService";

class EmployeesService extends ApiService {
  getSlug() {
    return "employees";
  }
  async login(data) {
    const response = await this.api.post(this.getSlug() + "/auth", data);
    return response.data;
  }
}

export default new EmployeesService();
