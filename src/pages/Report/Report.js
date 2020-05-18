import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";

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
  render() {
    const { reports } = this.state;
    return (
      <main className="col-9 d-flex justify-around align-items-start flex-wrap">
        {reports.map((report) => (
          <div className="card col-5">
            <h5 className="card-header">Отчет по задаче {report.task_id}</h5>
            <div className="card-body">
              <h5 className="card-title">{report.description}</h5>
              <p className="card-text">{report.link}</p>
              <h5 className="card-title">Дата создания</h5>
              <p className="card-text">{report.date}</p>
              <h5 className="card-title">Состояние</h5>
              <p className="card-text">{report.status}</p>
              <h5 className="card-title">Исполнитель</h5>
              <p className="card-text">{report.employee_id}</p>
              <h5 className="card-title">Количество бонусов</h5>
              <p className="card-text">{report.points}</p>
              <a href="#" className="btn btn-primary  m-1">
                Сохранить
              </a>
              <a href="#" className="btn btn-primary  m-1">
                Изменить
              </a>
              <a href="#" className="btn btn-primary  m-1">
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
