import React, { Component } from "react";

import moment from "moment";
import { status } from "../../constants/translation";
import EmployeesService from "../../services/EmployeesService";

import { withAuth } from "../../stores/User";

class ReportCard extends Component {
  state = {
    employee: null,
  };
  async componentDidMount() {
    const employeeId = this.props.data.taskId.employee;
    const employee = await EmployeesService.get(employeeId);
    this.setState({ employee });
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
          <p>{data.taskId.name}</p>
        </div>

        <div className="card-body">
          <h5>Комментарий</h5>
          <p className="card-title">{data.description}</p>
          <p className="card-text">Ссылка: {data.link}</p>
          <h5 className="card-title">Дата создания</h5>
          <p className="card-text">
            {moment(data.date).format("Do MMMM YYYY")}
          </p>
          <h5 className="card-title">Дата завершения</h5>
          <p className="card-text">
            {moment(data.finishDate).format("Do MMMM YYYY")}
          </p>
          <p className="card-text">Состояние: {status[data.status]}</p>
          {employee && (
            <p className="card-title">
              Исполнитель:
              {`${employee.surname} ${employee.name} ${employee.patronymic}`}
            </p>
          )}
          {data.project && (
            <p className="card-text">Проект: {data.project.name}</p>
          )}
        </div>
        {(type && type === "manager") ||
          (_id === data.taskId.employee && (
            <div>
              <div className="btn btn-primary m-1" onClick={onDelete}>
                Удалить
              </div>
              <a href="#" className="btn btn-primary  m-1">
                Изменить
              </a>
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
          ))}
      </div>
    );
  }
}

export default withAuth(ReportCard);