import React from "react";

const Resume = () => {
  return (
    <main className="col-8 bonuce">
      <a href="#" className="btn btn-primary">
        Создать резюме
      </a>
      <div className="card col-12">
        <h5 className="card-header">ФИО</h5>
        <div className="card-body">
          <h5 className="card-title">Комментарий</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <h5 className="card-title">e-mail</h5>
          <p className="card-text">12345@ukr.net</p>
          <h5 className="card-title">Телефон</h5>
          <p className="card-text">12345678</p>
          <h5 className="card-title">Приоритет</h5>
          <p className="card-text">2</p>
          <h5 className="card-title">Назначить собеседование</h5>
          <a href="#" className="btn btn-primary">
            Редактировать
          </a>
          <a href="#" className="btn btn-primary">
            Удалить
          </a>
        </div>
      </div>
    </main>
  );
};

export default Resume;
