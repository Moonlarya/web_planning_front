import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ProjectService from "../../services/ProjectService";
import ReportsService from "../../services/ReportsService";

import * as moment from "moment";
import { status } from "../../constants/translation";

class ProjectPage extends Component {
  state = {
    reports: {},
  };
  componentDidMount() {
    this.loadProject();
  }
  loadProject = async () => {
    const { projectId } = this.props.match.params;
    const project = await ProjectService.get(projectId);
    const reports = await ReportsService.getAllbyProjectId(projectId);
    this.setState({ project, reports });
  };
  render() {
    const { project, reports } = this.state;
    if (!project) {
      return null;
    }
    return (
      <div>
        <div className="mx-auto col-5">
          <h3 className="m-3">Информация о проекте</h3>
          <h5 className="card-header">{project.name}</h5>
          <p className="card-text">{project.description}</p>
          <p className="card-text">
            Дедлайн: {moment(`${project.deadline}`).format("Do MMMM YYYY")}
          </p>
        </div>
        <div className="col-12">
          <h4 className="m-3">Отчетная информация</h4>
          {reports.map((report, index) => (
            <div className="card col-3" key={index}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectPage);
