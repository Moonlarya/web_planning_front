import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Payout extends Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <main class="col-8 bonuce">
          <h5>История начислений</h5>
          <div id="your-id" style={{ height: 400 }}></div>
        </main>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}

export default Payout;
