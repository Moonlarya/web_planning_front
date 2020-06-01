import React, { Component } from "react";
import { Link } from "react-router-dom";

import CriteriasService from "../../services/CriteriasService";
import GradesService from "../../services/GradesService";
import EmployeesService from "../../services/EmployeesService";

import EmployeeGrades from "../../components/EmployeeGrades";

class Grades extends Component {
  state = {
    criterias: [],
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
    this.setState({ criterias, employeeGrades });
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
    console.log(employeeGrades);
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
        <ul className="text-left list-group col-3">
          {criterias.map((el) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {el.name}
              <div
                className="btn btn-primary mx-3 rounded-circle px-2.7"
                onClick={() => this.deleteInfo(el._id)}
              >
                −
              </div>
            </li>
          ))}
        </ul>
        <h4>Результаты предыдущего тестирования:</h4>
        <div className="d-flex">
          {employeeGrades &&
            employeeGrades.map((el, index) => (
              <EmployeeGrades data={el} key={index} />
            ))}
        </div>
      </div>
    );
  }
}

export default Grades;
