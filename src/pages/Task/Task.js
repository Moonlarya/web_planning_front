import React from "react";
import { Link } from "react-router-dom";

const Task = () => (
  <div>
    <Link to="/addtask" className="btn btn-primary mt-3">
      Создать задачу
    </Link>
    <div className="d-flex">
      <div className="card col-3">
        <h5 className="card-header">Задача к выполнению</h5>
        <div className="card-body">
          <h5 className="card-title">Описание</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <h5 className="card-title">Дедлайн</h5>
          <p className="card-text">10/2/2020</p>
          <h5 className="card-title">Бонусы</h5>
          <p className="card-text">50</p>
          <Link to="/addreport" className="btn btn-primary mt-3">
            Создать отчет
          </Link>
        </div>
      </div>
      <div className="card col-3">
        <h5 className="card-header">Выполненная задача</h5>
        <div className="card-body">
          <h5 className="card-title">Описание</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <h5 className="card-title">Дедлайн</h5>
          <p className="card-text">10/2/2020</p>
          <h5 className="card-title">Выполнено</h5>
          <p className="card-text">8/2/2020</p>
          <h5 className="card-title">Бонусы</h5>
          <p className="card-text">50</p>
          <h5 className="card-title">Полученные бонусы</h5>
          <p className="card-text">10</p>
        </div>
      </div>
    </div>
  </div>
);

export default Task;
