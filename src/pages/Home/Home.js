import React, { Component } from "react";
import TaskService from "../../services/TasksService";
import { Link } from "react-router-dom";

import "./style.scss";

class Home extends Component {
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
      <div id="accordion">
        {tasks.map((task) => (
          <div className="card" key={task._id}>
            <div
              className="card-header d-flex justify-content-between"
              id="headingOne"
            >
              <h5
                className="mb-0 btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {task.name}
              </h5>
              <h6 className="state mb-0 btn">Состояние</h6>
              <h6 className="mb-0 btn">{task.employee.name}</h6>
            </div>
            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                <h5 className="card-title">Описание</h5>
                <p className="card-text">{task.description}</p>
                <h5 className="card-title">Дедлайн</h5>
                <p className="card-text">{task.deadline}</p>
                <h5 className="card-title">Бонусы</h5>
                <p className="card-text">{task.bonuce}</p>
                <Link to="/addreport" className="btn btn-primary">
                  Отчет
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
