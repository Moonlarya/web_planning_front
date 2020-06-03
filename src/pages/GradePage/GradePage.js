import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import EmployeesService from "../../services/EmployeesService";
import GradesService from "../../services/GradesService";
import CriteriasService from "../../services/CriteriasService";

import { positionTypes } from "../../constants/translation";

import { Formik } from "formik";

class GradePage extends Component {
  state = { employee: {}, criterias: [] };

  onSubmit = async (values) => {
    const { employeeId } = this.props.match.params;
    const criteriaIds = Object.keys(values);
    await Promise.all(
      criteriaIds.map(async (criteriaId) => {
        const submitValues = {
          criteriaId,
          employeeId,
          grade: values[criteriaId],
        };
        await GradesService.create(submitValues);
      })
    );
    this.props.history.push("/employees");
  };

  componentDidMount() {
    this.loadEmployee();
  }
  loadEmployee = async () => {
    const { employeeId } = this.props.match.params;
    const employee = await EmployeesService.get(employeeId);
    const criterias = await CriteriasService.getAll();
    this.setState({ employee, criterias });
  };
  render() {
    const { employee, criterias } = this.state;
    const criteriaInitialValues = {};
    criterias.forEach((criteria) => (criteriaInitialValues[criteria._id] = ""));

    if (!employee) {
      return null;
    }
    return (
      <div>
        <div className="col-4 mx-auto my-3">
          <h3>Оценивание сотрудника</h3>
          <h5 className="m-3">Информация о сотруднике</h5>
          <h5 className="card-header">{`${employee.surname} ${employee.name} ${employee.patronymic}`}</h5>
          <p className="card-text">{positionTypes[employee.type]}</p>
          <p className="card-text">e-mail: {employee.email}</p>
          <p className="card-text">Номер телефона: {employee.phone}</p>
        </div>
        <h5 className="m-3">Оценивание</h5>
        <Formik onSubmit={this.onSubmit} initialValues={criteriaInitialValues}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className="col-4 list-group mx-auto my-3"
            >
              {criterias.map((criteria) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={criteria._id}
                >
                  <span>{criteria.name}</span>
                  <select
                    className="mb-3"
                    type="text"
                    name={criteria._id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[criteria._id]}
                  >
                    <option> </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </li>
              ))}

              <button
                type="submit"
                className="btn btn-primary m-3 col-3 mx-auto"
                disabled={isSubmitting}
              >
                Оценить
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
export default withRouter(GradePage);
