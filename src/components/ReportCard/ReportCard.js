import React, { Component } from "react";

import moment from "moment";
import { status } from "../../constants/translation";
import EmployeesService from "../../services/EmployeesService";

import {
  faEdit,
  faTrashAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { withAuth } from "../../stores/User";

import { extractHostname } from "../../helpers";

class ReportCard extends Component {
  state = {
    employee: null,
  };
  async componentDidMount() {
    if (this.props.data.taskId) {
      const employeeId = this.props.data.taskId.employee;
      const employee = await EmployeesService.get(employeeId);
      this.setState({ employee });
    }
  }
  render() {
    const { data, onDelete } = this.props;
    const { employee } = this.state;
    const {
      user: { type, _id },
    } = this.props;
    return (
      <div className="card col-8 col-md-4 col-lg-3  m-3 text-left">
        <div className="card-header">
          <h5>Отчет по задаче</h5>
          {data.taskId && <p>{data.taskId.name}</p>}
        </div>

        <div>
          <h5>Комментарий</h5>
          <p className="card-title">{data.description}</p>
          <p className="card-text">
            Ссылка:{" "}
            <a target="_blank" rel="noopener noreferrer" href={data.link}>
              {extractHostname(data.link)}
            </a>
          </p>
          <h5 className="card-title">Дата создания</h5>
          <p className="card-text">
            {moment(data.date).format("Do MMMM YYYY")}
          </p>
          {data.finishDate && (
            <div>
              <h5 className="card-title">Дата завершения</h5>
              <p className="card-text">
                {moment(data.finishDate).format("Do MMMM YYYY")}
              </p>
            </div>
          )}
          <p className="card-text">Состояние: {status[data.status]}</p>
          {employee && (
            <p className="card-title">
              Исполнитель:
              {`${employee.surname} ${employee.name} ${employee.patronymic}`}
            </p>
          )}
          {data.project.name && (
            <p className="card-text">Проект: {data.project.name}</p>
          )}
        </div>
        {(type === "manager" ||
          (data.taskId && _id === data.taskId.employee)) && (
          <div className="w-100">
            
            <Link
              to={`/report/${data._id}`}
              className="btn btn-primary w-100 m-1"
            >
              <FontAwesomeIcon icon={faEdit} color="blue" />
              <span className="visibleHeaders">Изменить</span>
            </Link>
            {this.props.onComplete && (
              <a
                href="#"
                className="btn btn-primary m-1 w-100"
                onClick={this.props.onComplete}
              >
                <FontAwesomeIcon icon={faCheckCircle} color="blue" />
                <span className="visibleHeaders">Завершить</span>
              </a>
            )}
            <div
              className="btn btn-outline-danger w-100 m-1"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} color="red" />
              <span className="visibleHeaders">Удалить</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(ReportCard);
