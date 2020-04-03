import React from "react";

const Balance = () => {
  return (
    <div>
      <section className="d-flex align-items-start flex-wrap">
        <div className="card">
          <h5 className="card-header">Текущий баланс</h5>
          <div className="card-body">
            <h5 className="card-title">Бонусы</h5>
            <p className="card-text">50</p>
            <h5 className="card-title">Штрафы</h5>
            <p className="card-text">20</p>
            <h5 className="card-title">Ожидаемые выплаты</h5>
            <p className="card-text">30</p>
          </div>
        </div>
      </section>
      <section>
        <h5 className="mx-auto">Бонусы</h5>
        <div className="d-flex align-items-start flex-wrap">
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
              <h5 className="card-title">Бонусы</h5>
              <p className="card-text">50</p>
              <a href="#" className="btn btn-primary">
                Создать отчет
              </a>
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
      </section>
    </div>
  );
};

export default Balance;
