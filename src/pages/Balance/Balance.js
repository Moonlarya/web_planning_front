import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

import TaskService from "../../services/TasksService";
import Chart from "./Chart";

import { withAuth } from "../../stores/User";

class Balance extends Component {
  state = {
    tasks: [],
    week: moment().startOf("week"),
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

  getBalanceData() {
    const { tasks } = this.state;

    const bonucesArr = tasks.filter((task) => task.bonuce > 0);
    const fineArr = tasks.filter((task) => task.bonuce < 0);
    const availableArr = tasks.filter((task) => task.status !== "finished");

    const bonuceSum = bonucesArr.reduce((acc, el) => acc + el.bonuce, 0);
    const fineSum = fineArr.reduce((acc, el) => acc + el.bonuce, 0);
    const available = availableArr.reduce((acc, el) => acc + el.bonuce, 0);
    const final = bonuceSum - fineSum;

    return { bonuceSum, fineSum, available, final };
  }

  handleWeekChange(value) {
    const { week } = this.state;

    this.setState({
      week: moment(week).add(value, "week"),
    });
  }

  render() {
    const { tasks, week } = this.state;

    const { bonuceSum, fineSum, available, final } = this.getBalanceData();

    const weekFormat = "Do MMMM YYYY";

    const finishedTasks = _.filter(tasks, { status: "finished" });
    const tasksByWeek = _.filter(finishedTasks, (el) =>
      moment(el.finishDate).isSame(week, "week")
    );

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

        <section className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <button
              className="btn btn-primary m-1"
              onClick={() => this.handleWeekChange(-1)}
            >
              {"<"}
            </button>
            <div>
              {moment(week).startOf("week").format(weekFormat)} -{" "}
              {moment(week).endOf("week").format(weekFormat)}
            </div>
            <button
              className="btn btn-primary m-1"
              onClick={() => this.handleWeekChange(1)}
            >
              {">"}
            </button>
          </div>

          <Chart tasks={tasksByWeek} />
        </section>

        <section>
          <h5 className="mx-auto">Бонусы</h5>
          <div className="d-flex align-items-start flex-wrap">
            {tasksByWeek.map((task) => (
              <div className="card col-3 text-left" key={task._id}>
                <div className="card-body">
                  <h5 className="card-title card-header">{task.name}</h5>
                  <p className="card-title">
                    Дедлайн: {moment(`${task.deadline}`).format("Do MMMM YYYY")}
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
                    <p className="card-title">Проект: {task.project.name}</p>
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
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(Balance);
