import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskService from "../../services/TasksService";

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
        <Link to="/addtask" className="btn btn-primary mt-3">
          Создать задачу
        </Link>
        <div className="d-flex">
          {tasks.map((task) => (
            <div className="card col-3" key={task._id}>
              <h5 className="card-header">Выполненная задача</h5>
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
                <h5 className="card-title">Дедлайн</h5>
                <h5 className="card-title">{task.deadline}</h5>
                <h5 className="card-title">Количество бонусов</h5>
                <p className="card-title">{task.bonuce}</p>
                <h5 className="card-title">Исполнитель</h5>
                <h5 className="card-title">{task.employee}</h5>
                <h5 className="card-title">Выполнено</h5>
                <p className="card-text">8/2/2020</p>
                <h5 className="card-title">Полученные бонусы</h5>
                <p className="card-text">10</p>
                <div
                  className="btn btn-primary"
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
