import ApiService from "./ApiService";
import TasksService from "./TasksService";

class ReportsService extends ApiService {
  getSlug() {
    return "reports";
  }
  async complete(id) {
    const report = await this.update(id, {
      status: "finished",
      finishDate: new Date(),
    });
    await TasksService.complete(report.taskId);
    console.log(report.taskId);
  }
}

export default new ReportsService();
