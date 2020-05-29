import ApiService from "./ApiService";

class ReportsService extends ApiService {
  getSlug() {
    return "reports";
  }
  async complete(id) {
    return this.update(id, { status: "finished", finishDate: new Date() });
  }
}

export default new ReportsService();
