import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { extractHostname } from "../../helpers";
import { withAuth } from "../../stores/User";
import { faEdit, faTrashAlt, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Project extends Component {
  state = {
    projects: [],
  };
  async componentDidMount() {
    this.loadClients();
  }
  loadClients = async () => {
    const projects = await ProjectService.getAll();
    console.log(projects);
    this.setState({ projects: projects });
  };
  deleteProject = async (id) => {
    await ProjectService.delete(id);
    this.loadClients();
  };
  render() {
    const { projects } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h3 className="m-3">Проекты</h3>
        {user.type === "manager" && (
          <Link to="/addproject" className="btn btn-primary mt-3">
            Создать проект
          </Link>
        )}
        <div className="d-flex flex-wrap justify-content-center">
          {projects.map((project) => (
            <div
              className="card  col-8 col-md-5 col-lg-3 m-3"
              key={project._id}
            >
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
                <FontAwesomeIcon icon={faInfo} color="blue" />
                <span className="visibleHeaders">Информация о проекте</span>
              </Link>
              {user.type === "manager" && (
                <Link
                  to={`/project/${project._id}`}
                  className="btn btn-primary m-1"
                >
                  <FontAwesomeIcon icon={faEdit} color="blue" />
                  <span className="visibleHeaders">Изменить</span>
                </Link>
              )}
              {user.type === "manager" && (
                <div
                  className="btn btn-outline-danger m-1"
                  onClick={() => this.deleteProject(project._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                  <span className="visibleHeaders">Удалить проект</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuth(Project);
