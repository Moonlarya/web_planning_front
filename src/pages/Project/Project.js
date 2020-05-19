import React, { Component, Fragment } from "react";
import axios from "axios";
import ProjectService from "../../services/ProjectService";
import { Link } from "react-router-dom";

class Project extends Component {
  state = {
    projects: [],
  };
  async componentDidMount() {
    this.loadClients();
  }
  loadClients = async () => {
    const projects = await ProjectService.getAll();
    this.setState({ projects: projects });
  };
  deleteProject = async (id) => {
    await ProjectService.delete(id);
    this.loadClients();
  };
  render() {
    const { projects } = this.state;
    return (
      <div>
        <Link to="/addproject" className="btn btn-primary mt-3">
          Создать проект
        </Link>
        <div className="d-flex flex-wrap">
          {projects.map((project) => (
            <div className="card col-3" key={project._id}>
              <h5 className="card-header">{project.name}</h5>
              <p className="card-text">{project.description}</p>
              <p className="card-text">Дедлайн: {project.deadline}</p>
              <p className="card-text">Бюджет: {project.budget}</p>
              <p className="card-text">Клиент: {project.clientId.name}</p>
              <div
                className="btn btn-primary"
                onClick={() => this.deleteProject(project._id)}
              >
                Удалить проект
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Project;
