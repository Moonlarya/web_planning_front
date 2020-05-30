import React from "react";
import { Link, withRouter } from "react-router-dom";

import photo from "../../assets/images/avatar1.jpg";

import User from "../../stores/User";

import "./style.scss";

import { withAuth } from "../../stores/User";

//const {user} = this.props;

const Sidebar = ({ history, user: { name, surname, patronymic } }) => (
  <div className="sidebar">
    <ul className="nav flex-column">
      <Link className="d-flex align-items-center" to="/profile">
        <div>
          <img
            src={photo}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "100%",
              margin: "20px",
            }}
          />
        </div>
        <div>{`${surname} ${name} ${patronymic}`}</div>
      </Link>
      <li className="nav-item">
        <Link className="nav-link" to="/home">
          Главная
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/clients">
          Клиенты
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects">
          Проекты
        </Link>
      </li>
      <li className="nav-item dropright">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Задачи
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link to="/task" className="dropdown-item" type="button">
            Задачи к выполнению
          </Link>
          <Link to="/finishedtasks" className="dropdown-item" type="button">
            Выполненные задачи
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link">
          Бонусы
        </a>
      </li>
      <li className="nav-item dropright">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Отчеты
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link to="/report" className="nav-link">
            Активные отчеты
          </Link>
          <Link to="/finishedreports" className="dropdown-item" type="button">
            Завершенные отчеты
          </Link>
        </div>
      </li>
      <li className="nav-item dropright">
        <Link to="/payout" className="nav-link">
          Выплаты
        </Link>
      </li>
      <li className="nav-item dropright">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Персонал
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link to="/employees" className="dropdown-item" type="button">
            Сотрудники
          </Link>
          <Link to="/grades" className="dropdown-item" type="button">
            Оценивание
          </Link>
        </div>
      </li>
      <li className="nav-item dropright">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Собеседования
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link to="/review" className="dropdown-item" type="button">
            Резюме
          </Link>
          <Link to="/calendar" className="dropdown-item" type="button">
            Календарь собеседований
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={(event) => {
            event.preventDefault();

            User.remove();

            history.push("/");
          }}
        >
          Выйти
        </a>
      </li>
    </ul>
  </div>
);

export default withRouter(withAuth(Sidebar));
