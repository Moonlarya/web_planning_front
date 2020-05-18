import React, { Component } from "react";
import CalendarView from "react-calendar";
import "../../style/Calendar.css";

class Calendar extends Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <main class="col-12 bonuce">
        <h3>Календарь собеседований</h3>
        <div className="d-flex align-items-center">
          <CalendarView onChange={this.onChange} value={this.state.date} />
          <div className="m-3 col-3">
            <h5>События на этот день:</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="btn btn-primary  m-1">
                Добавить
              </a>
              <a href="#" className="btn btn-primary  m-1">
                Удалить
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Calendar;
