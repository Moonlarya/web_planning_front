import React, { Component } from "react";

import EmployeesService from "../../services/EmployeesService";

import { positionTypes } from "../../constants/translation";

class EmployeeGrades extends Component {
  state = {
    employee: null,
  };

  componentDidMount = async () => {
    const { employeeId } = this.props.data[0];
    const employee = await EmployeesService.get(employeeId);
    this.setState({ employee });
  };

  getCriteriaById = (id) => {
    return this.props.criterias.find((el) => el._id === id);
  };

  render() {
    const { data } = this.props;
    const { employee } = this.state;
    if (!employee) {
      return null;
    }

    return (
      <div className="card col-3">
        <h4>{`${employee.surname} ${employee.name} ${employee.patronymic}`}</h4>
        <p>Должность: {positionTypes[employee.type]}</p>
        <ul className="list-group">
          {data.map((element) => {
            const criteria = this.getCriteriaById(element.criteriaId);
            if (!criteria) {
              return null;
            }
            return (
              <li className="list-group-item" key={element._id}>
                <p>Дата</p>
                <p className="text-left">
                  {criteria.name}: {element.grade}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default EmployeeGrades;
