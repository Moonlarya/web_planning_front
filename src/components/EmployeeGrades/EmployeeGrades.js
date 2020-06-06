import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

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
    const { criterias } = this.props;

    return criterias.find((el) => el._id === id);
  };

  getGradesData() {
    const { data } = this.props;

    const group = _.chain(data)
      .groupBy((el) => moment(el.createdAt).format("Do MMMM YYYY"))
      .map((el, key) => ({
        title: key,
        data: el,
      }))
      .value();

    return group;
  }

  render() {
    const { employee } = this.state;
    if (!employee) {
      return null;
    }

    const data = this.getGradesData();

    return (
      <div className="card col-3">
        <h4>{`${employee.surname} ${employee.name} ${employee.patronymic}`}</h4>
        <p>Должность: {positionTypes[employee.type]}</p>
        <ul className="list-group">
          {data.map((day) => (
            <li className="list-group-item" key={day.title}>
              <p>{day.title}</p>
              {day.data.map((el) => {
                const criteria = this.getCriteriaById(el.criteriaId);
                if (!criteria) {
                  return null;
                }

                return (
                  <p className="text-left" key={el._id}>
                    {criteria.name}: {el.grade}
                  </p>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EmployeeGrades;
