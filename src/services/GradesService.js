import ApiService from "./ApiService";

class GradesService extends ApiService {
  getSlug() {
    return "grades";
  }
  async getAllbyEmployeeId(id) {
    const response = await this.api.get(this.getSlug() + "/employee/" + id);
    return response.data;
  }
}

export default new GradesService();
