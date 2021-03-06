import React, { Component } from "react";
import TaskService from "../../services/TasksService";
import * as moment from "moment";
import { withAuth } from "../../stores/User";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FinishedTasks extends Component {
  state = {
    tasks: [],
  };
  async componentDidMount() {
    this.loadInfo();
  }
  loadInfo = async () => {
    const tasks = await TaskService.getAll();
    this.setState({ tasks: tasks });
  };
  deleteInfo = async (id) => {
    await TaskService.delete(id);
    this.loadInfo();
  };
  render() {
    const { tasks } = this.state;
    const {
      user: { type },
    } = this.props;
    const filteredTasks = tasks.filter((task) => task.status === "finished");
    return (
      <div>
        <h3 className="m-3">Выполненные задачи</h3>
        <div className="d-flex justify-content-center text-left flex-wrap">
          {filteredTasks.map((task) => (
            <div
              className="card col-12 col-md-5 col-lg-3 mx-auto"
              key={task._id}
            >
              <div>
                <h5 className="card-title card-header">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-title">
                  Дата создания: {moment(task.createdAt).format("Do MMMM YYYY")}
                </p>
                <p className="card-title">
                  Дедлайн: {moment(task.deadline).format("Do MMMM YYYY")}
                </p>
                <p className="card-text">
                  Дата завершения:
                  {moment(task.finishDate).format("Do MMMM YYYY")}
                </p>
                {task.project && (
                  <p className="card-title">Проект: {task.project.name}</p>
                )}

                <p className="card-title">Количество бонусов: {task.bonuce}</p>
                {task.employee && typeof task.employee !== "string" && (
                  <p className="card-title">
                    Исполнитель:
                    {`${task.employee.surname} ${task.employee.name} ${task.employee.patronymic}`}
                  </p>
                )}
                {task.earnedBonuce && (
                  <p className="card-text">
                    Полученные бонусы: {task.earnedBonuce.toFixed(2)}
                  </p>
                )}
                {type && type === "manager" && (
                  <div
                    className="btn btn-outline-danger m-1 mx-auto w-100"
                    onClick={() => this.deleteInfo(task._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} color="red" />
                  <span className="visibleHeaders">Удалить</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(FinishedTasks);
