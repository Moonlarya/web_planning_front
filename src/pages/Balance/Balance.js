import React, { Component } from "react";
import * as moment from "moment";
import TaskService from "../../services/TasksService";

import { withAuth } from "../../stores/User";

class Balance extends Component {
  state = {
    tasks: [],
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
  render() {
    const { tasks } = this.state;
    console.log(tasks);
    return (
      <div>
        <section className="d-flex align-items-start flex-wrap">
          <div className="card">
            <h5 className="card-header">Текущий баланс</h5>
            <div className="card-body d-flex">
              <p className="card-text mx-3">Полученные бонусы: 50</p>
              <p className="card-text mx-3">Полученные штрафы: 20</p>
              <p className="card-text mx-3">Ожидаемые выплаты: 30</p>
              <p className="card-text mx-3">Доступные бонусы: 300</p>
            </div>
          </div>
        </section>
        <section>
          <h5 className="mx-auto">Бонусы</h5>
          <div className="d-flex align-items-start flex-wrap">
            {tasks.map((task) => {
              if (task.status === "finished")
                return (
                  <div className="card col-3 text-left" key={task._id}>
                    <div className="card-body">
                      <h5 className="card-title card-header">{task.name}</h5>
                      <p className="card-title">
                        Дедлайн:{" "}
                        {moment(`${task.deadline}`).format("Do MMMM YYYY")}
                      </p>
                      <p className="card-text">
                        Дата завершения:{moment(``).format("Do MMMM YYYY")}
                      </p>

                      {task.employee &&
                        typeof task.employee !== "string" &&
                        this.props.user.type === "manager" && (
                          <p className="card-title">
                            Исполнитель:
                            {`${task.employee.surname} ${task.employee.name} ${task.employee.patronymic}`}
                          </p>
                        )}

                      {task.project && (
                        <p className="card-title">
                          Проект: {task.project.name}
                        </p>
                      )}
                      <p className="card-title">
                        Количество бонусов: {task.bonuce}
                      </p>
                      <p className="card-text">Полученные бонусы:</p>
                    </div>
                  </div>
                );
              else
                return (
                  <div className="card col-3" key={task._id}>
                    <div className="card-body text-left">
                      <h5 className="card-header">{task.name}</h5>
                      <p className="card-title">
                        Дедлайн:{" "}
                        {moment(`${task.deadline}`).format("Do MMMM YYYY")}
                      </p>

                      {task.employee && typeof task.employee !== "string" && (
                        <p className="card-title">
                          Исполнитель:
                          {`${task.employee.surname} ${task.employee.name} ${task.employee.patronymic}`}
                        </p>
                      )}
                      {task.project && (
                        <p className="card-title">
                          Проект: {task.project.name}
                        </p>
                      )}
                      <p className="card-title">
                        Количество бонусов: {task.bonuce}
                      </p>
                    </div>
                  </div>
                );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(Balance);
