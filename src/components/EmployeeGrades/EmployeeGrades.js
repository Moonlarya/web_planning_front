import React, { Component } from "react";

class EmployeeGrades extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div className="card col-3">
        <h3>Имя сотрудника</h3>
        <p>Должность: </p>
        <ul className="list-group">
          <li className="list-group-item">
            <p>Дата</p>
            <p className="text-left">Оценка1:2 </p>
            <p className="text-left">Оценка2:4</p>
          </li>

          <li className="list-group-item">
            <p>Дата</p>
            <p className="text-left">Оценка1:2 </p>
            <p className="text-left">Оценка2:4</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default EmployeeGrades;
