import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ProjectService from "../../services/ProjectService";
import ReportsService from "../../services/ReportsService";
import ReportCard from "../../components/ReportCard/";
import { extractHostname } from "../../helpers";

import * as moment from "moment";

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
        <div className="mx-auto col-9 col-md-7 col-lg-4">
          <h3 className="m-3 mx-auto">Информация о проекте</h3>
          <h5 className="card-header">{project.name}</h5>
          <p className="card-text">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.description}
            >
              {extractHostname(project.description)}
            </a>
          </p>
          <p className="card-text">
            Дедлайн: {moment(`${project.deadline}`).format("Do MMMM YYYY")}
          </p>
        </div>
        <h4 className="m-3">Отчетная информация</h4>
        <div className="col-12 d-flex justify-content-center flex-wrap">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              data={report}
              onDelete={() => this.deleteInfo(report._id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectPage);
