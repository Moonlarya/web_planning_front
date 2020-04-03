import React from "react";

const Report = () => {
  return (
    <main className="col-9 d-flex justify-around align-items-start flex-wrap">
      <div className="card col-5">
        <h5 className="card-header">Отчет по задаче 1</h5>
        <div className="card-body">
          <h5 className="card-title">Описание</h5>
          <p className="card-text">http://blabla.com/12345</p>
          <h5 className="card-title">Дата создания</h5>
          <p className="card-text">23/01/2020</p>
          <h5 className="card-title">Состояние</h5>
          <p className="card-text">Выполняется</p>
          <a href="#" className="btn btn-primary">
            Сохранить
          </a>
          <a href="#" className="btn btn-primary">
            Изменить
          </a>
          <a href="#" className="btn btn-primary">
            Завершить
          </a>
        </div>
      </div>
    </main>
  );
};

export default Report;
