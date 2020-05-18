import React, { Component } from "react";
import { Link } from "react-router-dom";

class Grades extends Component {
  render() {
    return (
      <div>
        <h1>Оценивание персонала</h1>
        <Link to="/" className="btn btn-primary mt-3">
          Добавить фактор
        </Link>
        <h2>На данный момент оценивание проходит по таким факторам:</h2>
        <ul>
          <li>
            Название
            <div
              className="btn btn-primary"
              //onClick={() => this.deleteGrade(grade._id)}
            >
              Удалить
            </div>
          </li>
        </ul>
        <h2>Результаты предыдущего тестирования:</h2>
        <div>
          <h3>Имя сотрудника</h3>
          <p>Должность: </p>
          <p>Оценка1:2 </p>
          <p>Оценка2:4</p>
        </div>
      </div>
    );
  }
}

export default Grades;
