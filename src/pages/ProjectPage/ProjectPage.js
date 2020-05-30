import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import ProjectService from "../../services/ProjectService";
import ReportsService from "../../services/ReportsService";

import * as moment from "moment";

class ProjectPage extends Component {
  state = {
    project: {},
  };
  async componentDidMount() {
    this.loadProject();
  }
  loadProject = async () => {
    const { projectId } = this.props.match.params;
    const project = await ProjectService.get(projectId);
    this.setState({ project: project });
  };
  render() {
    const { projectId } = this.props.match.params;
    const { project } = this.state;
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
        <div>
          <h4 className="m-3">Отчетная информация</h4>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectPage);
