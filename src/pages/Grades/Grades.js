import React, { Component } from "react";
import { Link } from "react-router-dom";

import CriteriasService from "../../services/CriteriasService";
import GradesService from "../../services/GradesService";
import EmployeesService from "../../services/EmployeesService";

import EmployeeGrades from "../../components/EmployeeGrades";

class Grades extends Component {
  state = {
    criterias: [],
    employeeGrades: [],
    employee: [],
  };
  loadInfo = async () => {
    const criterias = await CriteriasService.getAll();
    const employee = await EmployeesService.getAll();
    const employeeIds = employee.map((el) => el._id);
    const employeeGrades = await Promise.all(
      employeeIds.map(async (id) => {
        return await GradesService.getAllbyEmployeeId(id);
      })
    );
    this.setState({ criterias, employeeGrades, employee });
  };
  deleteInfo = async (id) => {
    await CriteriasService.delete(id);
    this.loadInfo();
  };
  componentDidMount = () => {
    this.loadInfo();
  };
  render() {
    const { criterias, employeeGrades } = this.state;
    return (
      <div>
        <h3 className="m-3">Оценивание персонала</h3>
        <Link to="/addcriteria" className="btn btn-primary mt-3">
          Добавить фактор
        </Link>
        {criterias.length > 0 && (
          <h5 className="m-3 text-left">
            На данный момент оценивание проходит по таким факторам:
          </h5>
        )}

        <div id="accordion" className="col-3">
          {criterias.map((el, index) => (
            <div>
              <div>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  data-toggle="collapse"
                  data-target={"#collapseOne" + index}
                  aria-expanded="true"
                  aria-controls={"collapseOne" + index}
                  key={index}
                >
                  {el.name}
                  <div
                    className="btn btn-primary mx-3 rounded-circle px-2.7"
                    onClick={() => this.deleteInfo(el._id)}
                  >
                    −
                  </div>
                </li>
              </div>
              {el.description && (
                <div
                  id={"collapseOne" + index}
                  className="collapse"
                  aria-labelledby={index}
                  data-parent="#accordion"
                >
                  <div className="card-body text-left">
                    <h5>Описание</h5>
                    <p className="card-text">{el.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h4>Результаты предыдущего тестирования:</h4>
        <div className="d-flex">
          {employeeGrades &&
            employeeGrades.map((el, index) => (
              <EmployeeGrades data={el} key={index} criterias={criterias} />
            ))}
        </div>
      </div>
    );
  }
}

export default Grades;
