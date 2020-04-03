import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Sidebar = () => (
  <div className="sidebar col-2">
    <ul className="nav flex-column">
      <h4 className="name nav-item">Юрашка мій котик</h4>

      <li className="nav-item">
        <Link className="nav-link" to="/">
          Главная
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
            Выполненные задачи
          </Link>
          <Link to="/task" className="dropdown-item" type="button">
            Задачи к выполнению
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
          Бонусы
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a
            href="../html/Bonuce/bonuce.html"
            className="dropdown-item"
            type="button"
          >
            Полученные
          </a>
          <a
            href="../html/Bonuce/bonuce.html"
            className="dropdown-item"
            type="button"
          >
            Доступные
          </a>
        </div>
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
          <Link className="nav-link" to="/report" className="dropdown-item">
            Активные
          </Link>
          <Link className="nav-link" to="/report" className="dropdown-item">
            Завершенные
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
          Выплаты
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link to="/payout" className="dropdown-item" type="button">
            История выплат
          </Link>
          <Link to="/balance" className="dropdown-item" type="button">
            Текущий баланс
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
          Персонал
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a
            href="../html/Worker/worker.html"
            className="dropdown-item"
            type="button"
          >
            Назначить задачу
          </a>
          <a
            href="../html/Worker/worker.html"
            className="dropdown-item"
            type="button"
          >
            Оценка деятельности
          </a>
          <a
            href="../html/Worker/worker.html"
            className="dropdown-item"
            type="button"
          >
            Кандидаты на вакансию
          </a>
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
          <Link to="/resume" className="dropdown-item" type="button">
            Резюме
          </Link>
          <Link to="/calendar" className="dropdown-item" type="button">
            Календарь собеседований
          </Link>
        </div>
      </li>
    </ul>
  </div>
);

export default Sidebar;
