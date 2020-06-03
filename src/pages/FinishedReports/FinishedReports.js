import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";
import * as moment from "moment";
import { status } from "../../constants/translation";

class FinishedReports extends Component {
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
      (report) => report.status === "finished"
    );
    return (
      <main className="col-9 ">
        <h3 className="m-3 text-center">Завершенные отчеты</h3>
        <div className="d-flex justify-around align-items-start flex-wrap">
          {filteredReports.map((report) => (
            <div className="card col-4 text-left" key={report.task_id}>
              <h5 className="card-header">Отчет по задаче {report.task_id}</h5>
              <div className="card-body">
                <h5 className="card-title">{report.description}</h5>
                <p className="card-text">{report.link}</p>
                <h5 className="card-title">Дата создания</h5>
                <p className="card-text">
                  {moment(report.date).format("Do MMMM YYYY")}
                </p>
                <h5 className="card-title">Дата завершения</h5>
                <p className="card-text">
                  {moment(report.finishDate).format("Do MMMM YYYY")}
                </p>
                <p className="card-text">Состояние: {status[report.status]}</p>
                <p className="card-text">Исполнитель: {report.employee_id}</p>
                {report.project && (
                  <p className="card-text">Проект: {report.project.name}</p>
                )}
              </div>
              <div
                className="btn btn-primary m-1"
                onClick={() => this.deleteInfo(report._id)}
              >
                Удалить
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default FinishedReports;
