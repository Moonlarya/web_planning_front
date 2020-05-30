import ApiService from "./ApiService";

class TasksService extends ApiService {
  getSlug() {
    return "tasks";
  }
  async getAllbyUserId(id) {
    const response = await this.api.get(this.getSlug() + "/employee/" + id);
    return response.data;
  }
}

export default new TasksService();
