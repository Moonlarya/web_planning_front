import React, { Component } from "react";

import moment from "moment";
import { status } from "../../constants/translation";
import EmployeesService from "../../services/EmployeesService";

import { Link } from "react-router-dom";
import { withAuth } from "../../stores/User";

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
      <div className="card col-4 text-left">
        <div className="card-header">
          <h5>Отчет по задаче</h5>
          {data.taskId && <p>{data.taskId.name}</p>}
        </div>

        <div className="card-body">
          <h5>Комментарий</h5>
          <p className="card-title">{data.description}</p>
          <p className="card-text">Ссылка: {data.link}</p>
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
        {data.taskId &&
          ((type && type === "manager") || _id === data.taskId.employee) && (
            <div>
              <div className="btn btn-primary m-1" onClick={onDelete}>
                Удалить
              </div>
              <Link to={`/report/${data._id}`} className="btn btn-primary  m-1">
                Изменить
              </Link>
              {this.props.onComplete && (
                <a
                  href="#"
                  className="btn btn-primary  m-1"
                  onClick={this.props.onComplete}
                >
                  Завершить
                </a>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default withAuth(ReportCard);
