import ApiService from "./ApiService";

class ProjectService extends ApiService {
  getSlug() {
    return "projects";
  }
}

export default new ProjectService();
