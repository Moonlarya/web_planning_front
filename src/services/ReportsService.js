import ApiService from "./ApiService";

class ReportsService extends ApiService {
  getSlug() {
    return "reports";
  }
}

export default new ReportsService();
