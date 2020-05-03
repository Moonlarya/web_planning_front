import React, { Component } from "react";
import Link from "react-router-dom";

class Employees extends Component {
  render() {
    return (
      <main>
        <div className="d-flex flex-wrap">
          <div className="card col-3">
            <h5 className="card-header">Должность: Веб-разработчик</h5>
            <p className="card-text">Гуменюк Марина Геннадиевна</p>
            <p className="card-text">e-mail: marina.humeniuk@gmail.com</p>
            <p className="card-text">Номер телефона: +380667775588</p>
            <p className="card-text">Дата появления: 21/01/2019</p>
            <div className="d-flex">
              <div className="btn btn-primary">Удалить</div>
              <div className="btn btn-primary">Изменить</div>
              <div className="btn btn-primary">Оценить</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Employees;
