import ApiService from "./ApiService";

class SalariesService extends ApiService {
  getSlug() {
    return "salaries";
  }
}

export default new SalariesService();
