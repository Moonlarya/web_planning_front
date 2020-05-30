import React, { Component } from "react";
import { Link } from "react-router-dom";

import TaskService from "../../services/TasksService";

import * as moment from "moment";

import { withAuth } from "../../stores/User";

class Task extends Component {
  state = {
    tasks: [],
    disabled: false,
  };
  async componentDidMount() {
    this.loadInfo();
  }
  loadInfo = async () => {
    const {
      user: { type, _id },
    } = this.props;
    let tasks = [];
    if (type === "manager") {
      tasks = await TaskService.getAll();
    } else {
      tasks = await TaskService.getAllbyUserId(_id);
    }
    this.setState({ tasks: tasks });
  };
  deleteInfo = async (id) => {
    await TaskService.delete(id);
    this.loadInfo();
  };
  createReport = (id) => {
    this.setState({ disabled: true });
    this.props.history.push("/addreport/" + id);
  };
  render() {
    const { tasks, disabled } = this.state;
    const filteredTasks = tasks.filter((task) => task.status !== "finished");
    return (
      <div>
        <Link to="/addtask" className="btn btn-primary mt-3">
          Создать задачу
        </Link>
        <div className="d-flex flex-wrap">
          {filteredTasks.map((task) => (
            <div className="card col-3" key={task._id}>
              <div className="card-body text-left">
                <h5 className="card-header">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-title">Порядок: {task.order}</p>
                <p className="card-title">
                  Дедлайн: {moment(`${task.deadline}`).format("Do MMMM YYYY")}
                </p>
                <p className="card-title">Бонусы: {task.bonuce}</p>
                {task.employee && typeof task.employee !== "string" && (
                  <p className="card-title">
                    Исполнитель:
                    {`${task.employee.surname} ${task.employee.name} ${task.employee.patronymic}`}
                  </p>
                )}
                <p className="card-title">Проект: {task.project}</p>
                <div className="d-flex flex-wrap justify-content-between">
                  <button
                    disabled={disabled}
                    onClick={() => this.createReport(task._id)}
                    className="btn btn-primary m-1"
                  >
                    Отчет
                  </button>

                  <div
                    className="btn btn-primary m-1"
                    onClick={() => this.deleteInfo(task._id)}
                  >
                    Удалить
                  </div>
                  <div className="btn btn-primary m-1">Завершить</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(Task);
