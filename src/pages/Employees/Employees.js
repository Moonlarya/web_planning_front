import React, { Component } from "react";
import EmployeesService from "../../services/EmployeesService";
import * as moment from "moment";
import { Link } from "react-router-dom";
import { withAuth } from "../../stores/User";

import { positionTypes } from "../../constants/translation";

class Employees extends Component {
  state = {
    employees: [],
  };
  async componentDidMount() {
    this.loadEmployees();
  }
  loadEmployees = async () => {
    const employees = await EmployeesService.getAll();
    this.setState({ employees });
  };
  deleteEmployee = async (id) => {
    await EmployeesService.delete(id);
    this.loadEmployees();
  };
  render() {
    const { employees } = this.state;
    const { user } = this.props;
    return (
      <main>
        <h3 className="m-3">Сотрудники</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {employees.map((employee) => (
            <div className="card col-3" key={employee._id}>
              <h5 className="card-header">{positionTypes[employee.type]}</h5>
              <p className="card-text">{`${employee.surname} ${employee.name} ${employee.patronymic}`}</p>
              <p className="card-text">e-mail: {employee.email}</p>
              <p className="card-text">Номер телефона: {employee.phone}</p>
              <p className="card-text">
                Дата появления:
                {moment(`${employee.createdAt}`).format("Do MMMM YYYY")}
              </p>

              <div className="d-flex flex-wrap  justify-content-center">
                {user.type === "hr" && (
                  <Link
                    to={`/gradepage/${employee._id}`}
                    className="btn btn-primary m-1"
                  >
                    Оценивание
                  </Link>
                )}
                {user.type === "manager" && (
                  <Link
                    to={`/employee/${employee._id}`}
                    className="btn btn-primary m-1"
                  >
                    Изменить
                  </Link>
                )}
                {user.type === "manager" && (
                  <div
                    className="btn btn-outline-danger m-1 "
                    onClick={() => this.deleteEmployee(employee._id)}
                  >
                    Удалить сотрудника
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}
export default withAuth(Employees);
