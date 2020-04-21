import ApiService from "./ApiService";

class EmployeesService extends ApiService {
  getSlug() {
    return "employees";
  }
}

export default new EmployeesService();
