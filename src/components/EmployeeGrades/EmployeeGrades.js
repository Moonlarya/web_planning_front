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
        <h4>
          Имя сотрудника
          {/*`${employee.surname} ${employee.name} ${employee.patronymic}`*/}
        </h4>
        <p>Должность: дизайнер {/*positionTypes[employee.type]*/}</p>
        <ul className="list-group">
          <li className="list-group-item">
            <p>Дата 1</p>
            <p className="text-left">Критерий 1: оценка</p>
            <p className="text-left">Оптимистичность : 3</p>
            <p className="text-left">Продуктивность : 4</p>
          </li>
          <li className="list-group-item">
            <p>Дата 2</p>
            <p className="text-left">Критерий 1: оценка</p>
            <p className="text-left">Оптимистичность : 1</p>
            <p className="text-left">Продуктивность : 5</p>
          </li>
          {/*data.map((element) => {
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
          })*/}
        </ul>
      </div>
    );
  }
}

export default EmployeeGrades;
