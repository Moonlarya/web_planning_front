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
              <h5 className="card-header">Задача к выполнению</h5>
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <h5 className="card-title">Описание</h5>
                <p className="card-text">{task.description}</p>
                <h5 className="card-title">Порядок</h5>
                <p className="card-text">{task.order}</p>
                <h5 className="card-title">Дедлайн</h5>
                <h5 className="card-title">{task.deadline}</h5>
                <h5 className="card-title">Количество бонусов</h5>
                <p className="card-title">{task.bonuce}</p>
                <h5 className="card-title">Исполнитель</h5>
                <h5 className="card-title">{task.employee.name}</h5>
                <div className="d-flex flex-wrap justify-content-between">
                  <Link to="/addreport" className="btn btn-primary">
                    Отчет
                  </Link>
                  <div
                    className="btn btn-primary"
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
