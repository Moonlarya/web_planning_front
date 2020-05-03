import React, { Component } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Calendar extends Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <main class="col-8 bonuce">
        <h5>Календарь собеседований</h5>
        <CalendarView onChange={this.onChange} value={this.state.date} />
      </main>
    );
  }
}

export default Calendar;
