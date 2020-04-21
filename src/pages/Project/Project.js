import React, { Component, Fragment } from "react";
import axios from "axios";
import ProjectService from "../../services/ProjectService";

class Project extends Component {
  state = {
    projects: [],
  };
  async componentDidMount() {
    const projects = await ProjectService.getAll();
    this.setState({ projects: projects });
  }
  render() {
    const { projects } = this.state;
    return (
      <div className="d-flex flex-wrap">
        {projects.map((project) => (
          <div className="card col-3" key={project._id}>
            <h5 className="card-header">{project.name}</h5>
            <p className="card-text">{project.description}</p>
            <p className="card-text">{project.deadline}</p>
            <p className="card-text">{project.budget}</p>
            <p className="card-text">{project.clientId}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Project;
