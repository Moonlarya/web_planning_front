import ApiService from "./ApiService";
import moment from "moment";

class TasksService extends ApiService {
  getSlug() {
    return "tasks";
  }
  async getAllbyUserId(id) {
    const response = await this.api.get(this.getSlug() + "/employee/" + id);
    return response.data;
  }
  async complete(id) {
    const task = await this.get(id);

    const plannedBonuces = task.bonuce;
    const createDate = moment(task.createdAt);
    const deadline = moment(task.deadline);
    const currDate = moment();
    const realBonuces = deadline.diff(currDate, "day");
    const maxBonuces = deadline.diff(createDate, "day");

    const earnedBonuce =
      plannedBonuces +
      (plannedBonuces / maxBonuces) * (realBonuces - maxBonuces);

    return this.update(id, {
      status: "finished",
      finishDate: currDate.toDate(),
      earnedBonuce,
    });
  }
}

export default new TasksService();
