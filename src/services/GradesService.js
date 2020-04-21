import ApiService from "./ApiService";

class GradesService extends ApiService {
  getSlug() {
    return "grades";
  }
}

export default new GradesService();
