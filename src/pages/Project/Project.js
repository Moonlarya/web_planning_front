import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import { Link } from "react-router-dom";
import * as moment from "moment";

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
        <h3 className="m-3">Проекты</h3>
        <Link to="/addproject" className="btn btn-primary mt-3">
          Создать проект
        </Link>
        <div className="d-flex flex-wrap">
          {projects.map((project) => (
            <div className="card col-3" key={project._id}>
              <h5 className="card-header">{project.name}</h5>
              <p className="card-text">{project.description}</p>
              <p className="card-text">
                Дедлайн: {moment(`${project.deadline}`).format("Do MMMM YYYY")}
              </p>
              <p className="card-text">Бюджет: {project.budget}</p>
              {project.clientId && (
                <p className="card-text">
                  Клиент:
                  {`${project.clientId.surname} ${project.clientId.name} ${project.clientId.patronymic}`}
                </p>
              )}
              <Link
                to={`/projects/${project._id}`}
                className="btn btn-primary m-1"
              >
                Информация о проекте
              </Link>
              <div
                className="btn btn-outline-danger m-1"
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
