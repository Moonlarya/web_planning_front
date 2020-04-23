import React from "react";
import { Link } from "react-router-dom";

const Review = () => {
  return (
    <main className="col-8 bonuce">
      <Link to="/addreview" className="btn btn-primary mt-3">
        Создать резюме
      </Link>
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

export default Review;
