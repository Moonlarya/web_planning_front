import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <header className="col-2">
      <div className="sidebar">
        <ul className="nav flex-column">
          <h4 className="name nav-item">My name</h4>
          <li className="nav-item">
            <a className="nav-link" href="#">Главная</a>
          </li>
          <li className="nav-item dropright">
            <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Задачи</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Task/task.html" className="dropdown-item" type="button">Выполненные задачи</a>
              <a href = "../html/Task/task.html" className="dropdown-item" type="button">Задачи к выполнению</a>
            </div>
          </li>
          <li className="nav-item dropright">
            <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Бонусы</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Bonuce/bonuce.html" className="dropdown-item" type="button">Полученные</a>
              <a href = "../html/Bonuce/bonuce.html" className="dropdown-item" type="button">Доступные</a>
            </div>
          </li>
          <li className="nav-item dropright">
            <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Отчеты</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Report/report.html" className="dropdown-item" type="button">Активные</a>
              <a href = "../html/Report/report.html" className="dropdown-item" type="button">Завершенные</a>
            </div>
          </li>
          <li className="nav-item dropright">
            <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Выплаты</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Payout/payout.html" className="dropdown-item" type="button">История выплат</a>
              <a href = "../html/Payout/balance.html" className="dropdown-item" type="button">Текущий баланс</a>
            </div>
          </li>
          <li className="nav-item dropright">
          <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Персонал</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Worker/worker.html" className="dropdown-item" type="button">Назначить задачу</a>
              <a href = "../html/Worker/worker.html" className="dropdown-item" type="button">Оценка деятельности</a>                            
              <a href = "../html/Worker/worker.html" className="dropdown-item" type="button">Кандидаты на вакансию</a>
            </div>
          </li>
          <li className="nav-item dropright">
          <a className="nav-link dropdown-toggle"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Собеседования</a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href = "../html/Resume/resume.html" className="dropdown-item" type="button">Резюме</a>
              <a href = "../html/Resume/calendar.html" className="dropdown-item" type="button">Календарь собеседований</a>
            </div>
          </li>
        </ul>
      </div>       
    </header>
    </div>
  );
}

export default App;
