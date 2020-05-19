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
                <p className="card-title">Дедлайн: {task.deadline}</p>
                <p className="card-title">Количество бонусов: {task.bonuce}</p>
                <p className="card-title">Исполнитель: {task.employee.name}</p>
                <p className="card-text">Дата завершения:</p>
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
