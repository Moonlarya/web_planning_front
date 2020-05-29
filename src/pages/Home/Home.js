import React, { Component } from "react";
import TaskService from "../../services/TasksService";
import "./style.scss";
import * as moment from "moment";

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
        {tasks &&
          tasks.map((task) => (
            <div className="card" key={task._id}>
              <div className="d-flex justify-content-between" id={task._id}>
                <h5
                  className="mb-0 btn btn-link"
                  data-toggle="collapse"
                  data-target={"#collapseOne" + task._id}
                  aria-expanded="true"
                  aria-controls={"collapseOne" + task._id}
                >
                  {task.name}
                </h5>
                <h6 className="state mb-0 btn">Состояние</h6>
                {task.employee && (
                  <h6 className="mb-0 btn">
                    {
                      (task.employee.surname ? task.employee.surname : null,
                      task.employee.name ? task.employee.name : null,
                      task.employee.patronymic
                        ? task.employee.patronymic
                        : null)
                    }
                  </h6>
                )}
              </div>
              <div
                id={"collapseOne" + task._id}
                className="collapse"
                aria-labelledby={task._id}
                data-parent="#accordion"
              >
                <div className="card-body text-left">
                  <p className="card-text">{task.description}</p>
                  <p className="card-title">
                    Дедлайн: {moment(`${task.deadline}`).format("Do MMMM YYYY")}
                  </p>
                  <p className="card-title">Бонусы: {task.bonuce}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Home;
