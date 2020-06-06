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

    const bonucesArr = tasks.filter((task) => task.bonuce > 0);
    const fineArr = tasks.filter((task) => task.bonuce < 0);
    const availableArr = tasks.filter((task) => task.status !== "finished");

    const bonuceSum = bonucesArr.reduce((acc, el) => acc + el.bonuce, 0);
    const fineSum = fineArr.reduce((acc, el) => acc + el.bonuce, 0);
    const available = availableArr.reduce((acc, el) => acc + el.bonuce, 0);
    const final = bonuceSum - fineSum;
    return (
      <div>
        <section className="d-flex align-items-start flex-wrap">
          <div className="card">
            <h5 className="card-header">Текущий баланс</h5>
            <div className="card-body d-flex">
              <p className="card-text mx-3">Полученные бонусы: {bonuceSum}</p>
              <p className="card-text mx-3">Полученные штрафы: {fineSum}</p>
              <p className="card-text mx-3">Ожидаемые выплаты: {final}</p>
              <p className="card-text mx-3">Доступные бонусы: {available}</p>
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
                        Дата завершения:
                        {moment(task.finishDate).format("Do MMMM YYYY")}
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
                      {task.earnedBonuce && (
                        <p className="card-text">
                          Полученные бонусы: {task.earnedBonuce.toFixed(2)}
                        </p>
                      )}
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
