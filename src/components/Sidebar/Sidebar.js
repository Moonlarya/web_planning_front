import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Sidebar = () => (
  <div className="sidebar col-2">
    <ul className="nav flex-column">
      <h4 className="name nav-item">Гуменюк Марина</h4>

      <li className="nav-item">
        <Link className="nav-link" to="/">
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
            Выполненные задачи
          </Link>
          <Link to="/task" className="dropdown-item" type="button">
            Задачи к выполнению
          </Link>
        </div>
      </li>
      <li className="nav-item dropright">
        <a href="../html/Bonuce/bonuce.html" className="dropdown-item">
          Бонусы
        </a>
      </li>
      <li className="nav-item dropright">
        <Link className="nav-link" to="/report" className="dropdown-item">
          Отчеты
        </Link>
      </li>
      <li className="nav-item dropright">
        <Link to="/payout" className="dropdown-item" type="button">
          Выплаты
        </Link>
      </li>
      <li className="nav-item dropright">
        <Link to="/employees" className="dropdown-item" type="button">
          Персонал
        </Link>
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
    </ul>
  </div>
);

export default Sidebar;
