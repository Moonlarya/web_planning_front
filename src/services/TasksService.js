import ApiService from "./ApiService";

class TasksService extends ApiService {
  getSlug() {
    return "tasks";
  }
}

export default new TasksService();
