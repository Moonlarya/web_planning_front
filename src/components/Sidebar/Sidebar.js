import React from "react";
import { Link } from "react-router-dom";
import photo from "../../assets/images/avatar1.jpg";

import "./style.scss";

const Sidebar = () => (
  <div className="sidebar col-2">
    <ul className="nav flex-column">
      <div className="d-flex align-items-center">
        <img
          src={photo}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "100%",
            margin: "20px",
          }}
        ></img>
        <h5>Гуменюк Марина</h5>
      </div>
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
          <Link to="/finishedtasks" className="dropdown-item" type="button">
            Выполненные задачи
          </Link>
          <Link to="/task" className="dropdown-item" type="button">
            Задачи к выполнению
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link">
          Бонусы
        </a>
      </li>
      <li className="nav-item">
        <Link to="/report" className="nav-link">
          Отчеты
        </Link>
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
        <Link className="nav-link" to="/">
          Выйти
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
