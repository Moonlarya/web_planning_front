import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";
import * as moment from "moment";
import { status } from "../../constants/translation";

class Report extends Component {
  state = {
    reports: [],
  };
  async componentDidMount() {
    this.loadInfo();
  }
  loadInfo = async () => {
    const reports = await ReportsService.getAll();
    this.setState({ reports: reports });
  };
  deleteInfo = async (id) => {
    await ReportsService.delete(id);
    this.loadInfo();
  };
  completeReport = async (id) => {
    await ReportsService.complete(id);
    this.loadInfo();
  };
  render() {
    const { reports } = this.state;
    console.log(reports);
    const filteredReports = reports.filter(
      (report) => report.status !== "finished"
    );
    return (
      <div>
        <h3 className="m-3">Активные отчеты</h3>
        <main className="col-12 d-flex justify-around align-items-start flex-wrap">
          {filteredReports.map((report) => (
            <div className="card col-3 text-left">
              <h5 className="card-header">
                Отчет по задаче {report.taskId.name}
              </h5>
              <div className="card-body">
                <h5 className="card-title">{report.description}</h5>
                <p className="card-text">{report.link}</p>
                <h5 className="card-title">Дата создания</h5>
                <p className="card-text">
                  {moment(`${report.date}`).format("Do MMMM YYYY")}
                </p>
                <p className="card-text">Состояние: {status[report.status]}</p>
                <p className="card-text">Исполнитель: {report.employee_id}</p>
                <p className="card-text">Получено бонусов: {report.points}</p>
                {report.project && (
                  <p className="card-text">Проект: {report.project.name}</p>
                )}

                <a href="#" className="btn btn-primary  m-1">
                  Сохранить
                </a>
                <a href="#" className="btn btn-primary  m-1">
                  Изменить
                </a>
                <a
                  href="#"
                  className="btn btn-primary  m-1"
                  onClick={() => this.completeReport(report._id)}
                >
                  Завершить
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Report;
