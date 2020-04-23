import React, { Component } from "react";
import Link from "react-router-dom";

class Empoyees extends Component {
  render() {
    return (
      <main>
        <div>
          <div className="d-flex flex-wrap">
            <div className="card col-3">
              <h5 className="card-header">Должность: Веб-разработчик</h5>
              <p className="card-text">Гуменюк Марина Геннадиевна</p>
              <p className="card-text">e-mail: marina.humeniuk@gmail.com</p>
              <p className="card-text">Номер телефона: +380667775588</p>
              <p className="card-text">Дата появления: 21/01/2019</p>
              <div className="btn btn-primary">Удалить сотрудника</div>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <h5 className="card-header">Должность: Дизайнер</h5>
            <p className="card-text">Пойдун Анастасия Александровна</p>
            <p className="card-text">e-mail: anastasiya.poidun@gmail.com</p>
            <p className="card-text">Номер телефона: +380663456345</p>
            <p className="card-text">Дата появления: 07/01/2019</p>
            <div className="btn btn-primary">Удалить сотрудника</div>
          </div>
          <div className="d-flex flex-wrap">
            <h5 className="card-header">Должность: Маркетолог</h5>
            <p className="card-text">Мошкота Савелий Андреевич</p>
            <p className="card-text">e-mail: mosh.s@gmail.com</p>
            <p className="card-text">Номер телефона: +380990045671</p>
            <p className="card-text">Дата появления: 01/01/2019</p>
            <div className="btn btn-primary">Удалить сотрудника</div>
          </div>
        </div>
      </main>
    );
  }
}
export default Empoyees;
