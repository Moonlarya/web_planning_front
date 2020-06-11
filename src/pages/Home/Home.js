import React, { Component } from "react";
import TaskService from "../../services/TasksService";
import "./style.scss";
import * as moment from "moment";
import { status } from "../../constants/translation";
import { withAuth } from "../../stores/User";

class Home extends Component {
  state = {
    tasks: [],
    backgroundColor: { active: "yellow", finished: "green" },
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
    const { tasks, backgroundColor } = this.state;

    return (
      <div id="accordion" className="col-12 m-3">
        <h2 className="m-3">Рабочая доска процессов</h2>
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
                <div
                  className="d-flex"
                  style={{ position: "absolute", top: "20", left: "500px" }}
                >
                  <div
                    className="m-auto"
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: `${backgroundColor[task.status]}`,
                      borderRadius: "100%",
                    }}
                  ></div>
                  <h6 className="mb-0 btn">{status[task.status]}</h6>
                </div>

                {task.employee && (
                  <h6 className="mb-0 btn">
                    {`${task.employee.surname} ${task.employee.name} ${task.employee.patronymic}`}
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
                  <p className="card-title">Доступные бонусы: {task.bonuce}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default withAuth(Home);
