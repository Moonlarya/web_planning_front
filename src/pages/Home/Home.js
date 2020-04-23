import React from "react";

import "./style.scss";

const Home = () => (
  <div id="accordion">
    <div className="card">
      <div
        className="card-header d-flex justify-content-between"
        id="headingOne"
      >
        <h5
          className="mb-0 btn btn-link"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Дизайн
        </h5>
        <h6 className="state mb-0 btn">Состояние</h6>
        <h6 className="mb-0 btn">Пойдун Анастасия</h6>
      </div>
      <div
        id="collapseOne"
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordion"
      >
        <div className="card-body">
          <h5 className="card-title">Описание</h5>
          <p className="card-text">
            Создать дизайн к проекту о планировании процессов микропредприятия.
          </p>
          <h5 className="card-title">Дедлайн</h5>
          <p className="card-text">10/2/2020</p>
          <h5 className="card-title">Бонусы</h5>
          <p className="card-text">50</p>
          <a href="#" className="btn btn-primary">
            Создать отчет
          </a>
        </div>
      </div>
    </div>
    <div className="card">
      <div
        className="card-header d-flex justify-content-between"
        id="headingTwo"
      >
        <h5
          className="mb-0 btn btn-link"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Исследование ЦА
        </h5>
        <h6 className="state mb-0 btn">Состояние</h6>
        <h6 className="mb-0 btn">Машкота Савелий</h6>
      </div>
      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordion"
      >
        <div className="card-body">
          <h5 className="card-title">Описание</h5>
          <p className="card-text">
            Исследовать целевую аудиторию и их предпочтения
          </p>
          <h5 className="card-title">Дедлайн</h5>
          <p className="card-text">10/2/2020</p>
          <h5 className="card-title">Бонусы</h5>
          <p className="card-text">50</p>
          <a href="#" className="btn btn-primary">
            Создать отчет
          </a>
        </div>
      </div>
    </div>
    <div className="card">
      <div
        className="card-header d-flex justify-content-between"
        id="headingThree"
      >
        <h5
          className="mb-0 btn btn-link"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Веб-разработка
        </h5>
        <h6 className="state mb-0 btn">Состояние</h6>
        <h6 className="mb-0 btn">Гуменюк Марина</h6>
      </div>
      <div
        id="collapseThree"
        className="collapse"
        aria-labelledby="headingThree"
        data-parent="#accordion"
      >
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
          <a href="#" className="btn btn-primary">
            Создать отчет
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
