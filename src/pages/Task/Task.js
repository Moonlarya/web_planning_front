import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskService from "../../services/TasksService";

class Task extends Component {
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
        <Link to="/addtask" className="btn btn-primary mt-3">
          Создать задачу
        </Link>
        <div className="d-flex flex-wrap">
          {tasks.map((task) => (
            <div className="card col-3" key={task._id}>
              <div className="card-body text-left">
                <h5 className="card-header">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-title">Порядок: {task.order}</p>
                <p className="card-title">Дедлайн: {task.deadline}</p>
                <p className="card-title">Бонусы: {task.bonuce}</p>
                <p className="card-title">Исполнитель: {task.employee.name}</p>
                <div className="d-flex flex-wrap justify-content-between">
                  <Link to="/addreport" className="btn btn-primary m-1">
                    Отчет
                  </Link>
                  <div
                    className="btn btn-primary m-1"
                    onClick={() => this.deleteInfo(task._id)}
                  >
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Task;
