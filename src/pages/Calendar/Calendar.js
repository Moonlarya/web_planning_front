import React, { Component } from "react";
import CalendarView from "react-calendar";
import "../../style/Calendar.css";
import ReviewsService from "../../services/ReviewsService";
import CalendarService from "../../services/CalendarService";
import { Formik } from "formik";
import * as moment from "moment";

class Calendar extends Component {
  state = {
    date: new Date(),
    reviews: [],
    events: [],
  };
  loadInfo = async () => {
    const reviews = await ReviewsService.getAll();
    const events = await CalendarService.getAll();
    this.setState({ reviews: reviews, events: events });
  };
  componentDidMount() {
    this.loadInfo();
  }

  onChange = (date) => this.setState({ date });

  onSubmit = async (values) => {
    try {
      values.date = this.state.date;
      await CalendarService.create(values);
    } catch {}
  };

  render() {
    const { reviews, events } = this.state;
    const dayEvents = events.filter((event) =>
      moment(event.date).isSame(this.state.date, "day")
    );
    return (
      <main className="col-12 bonuce h-100">
        <h3>Календарь собеседований</h3>
        <div className="d-flex">
          <CalendarView
            onChange={this.onChange}
            value={this.state.date}
            tileContent={(value) => {
              const filter = events.filter((event) =>
                moment(event.date).isSame(value.date, "day")
              );
              return filter.length ? <h1>{filter.length}</h1> : null;
            }}
          />
          <div className="m-3 col-3 d-flex flex-column justify-content-around">
            <div>
              <h5>Добавить событие:</h5>
              <Formik
                onSubmit={this.onSubmit}
                initialValues={{
                  employee: "",
                  review: "",
                  date: this.state.date,
                  time: "",
                  name: "",
                  description: "",
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column mt-3 p-3 mx-auto"
                  >
                    <span>Название</span>
                    <input
                      className="m-3 w-100 mx-auto"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                    <span>Описание</span>
                    <input
                      className="m-3 w-100 mx-auto"
                      type="text"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description &&
                      touched.description &&
                      errors.description}
                    <span>Время</span>
                    <input
                      className="m-3 w-100 mx-auto"
                      type="text"
                      name="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.time}
                    />
                    {errors.time && touched.time && errors.time}
                    <select
                      className="mb-3"
                      name="review"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.review}
                    >
                      <option value="" label="Выберите претендента" />
                      {reviews.map((review) => (
                        <option value={review._id} key={review._id}>
                          {review.name}
                        </option>
                      ))}
                    </select>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary mx-3 rounded-circle px-2.7"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-primary mx-3 rounded-circle px-2.7"
                        //onClick={() => this.deleteInfo(el._id)}
                      >
                        −
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div>
              {!!dayEvents.length && <h5>События на этот день:</h5>}
              {dayEvents.map((event) => (
                <ul key={event._id} className="card list-group list-unstyled">
                  <li>{event.name}</li>
                  <li>{event.description}</li>
                  <li>{event.time}</li>
                  <li>{event.review}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Calendar;
