import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";
import * as moment from "moment";

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
    const filteredReports = reports.filter(
      (report) => report.status !== "finished"
    );
    return (
      <main className="col-9 d-flex justify-around align-items-start flex-wrap">
        {filteredReports.map((report) => (
          <div className="card col-4 text-left">
            <h5 className="card-header">Отчет по задаче {report.task_id}</h5>
            <div className="card-body">
              <h5 className="card-title">{report.description}</h5>
              <p className="card-text">{report.link}</p>
              <h5 className="card-title">Дата создания</h5>
              <p className="card-text">
                {moment(`${report.date}`).format("Do MMMM YYYY")}
              </p>
              <p className="card-text">Состояние: {report.status}</p>
              <p className="card-text">Исполнитель: {report.employee_id}</p>
              <p className="card-text">Количество бонусов: {report.points}</p>
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
    );
  }
}

export default Report;
