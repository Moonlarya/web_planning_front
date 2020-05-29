import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskService from "../../services/TasksService";
import * as moment from "moment";

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
    return (
      <div>
        <div className="d-flex text-left">
          {tasks.map((task) => (
            <div className="card col-3" key={task._id}>
              <div className="card-body">
                <h5 className="card-title card-header">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-title">
                  Дедлайн: {moment(`${task.deadline}`).format("Do MMMM YYYY")}
                </p>
                <p className="card-title">Количество бонусов: {task.bonuce}</p>
                {task.employee && (
                  <p className="card-title">
                    Исполнитель:
                    {
                      (task.employee.surname ? task.employee.surname : null,
                      task.employee.name ? task.employee.name : null,
                      task.employee.patronymic
                        ? task.employee.patronymic
                        : null)
                    }
                  </p>
                )}
                <p className="card-text">
                  Дата завершения:{moment(``).format("Do MMMM YYYY")}
                </p>
                <p className="card-text">Полученные бонусы:</p>
                <div
                  className="btn btn-primary m-1"
                  onClick={() => this.deleteInfo(task._id)}
                >
                  Удалить
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FinishedTasks;
