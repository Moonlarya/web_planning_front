import ApiService from "./ApiService";

class ProjectService extends ApiService {
  getSlug() {
    return "projects";
  }

  async getAllbyUserId(id) {
    const response = await this.api.get(this.getSlug() + "/report/" + id);
    return response.data;
  }
}

export default new ProjectService();
