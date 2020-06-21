import React, { Component } from "react";
import CalendarView from "react-calendar";

import "../../style/Calendar.scss";

import ReviewsService from "../../services/ReviewsService";
import CalendarService from "../../services/CalendarService";
import Datetime from "react-datetime";
import "../../style/datetime.css";

import { ErrorMsg } from "../SignIn/view";
import { Formik } from "formik";
import moment from "moment";

import { typeReview, resultEvent } from "../../constants/translation";

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
  deleteInfo = async (id) => {
    await CalendarService.delete(id);
    this.loadInfo();
  };
  onChange = (date) => this.setState({ date });

  onSubmit = async (values) => {
    const date = this.getDate(values.time);
    const valuesToSubmit = { ...values, date: date.toDate() };
    try {
      await CalendarService.create(valuesToSubmit);
      this.loadInfo();
    } catch {}
  };
  resultFunc = async (id, value) => {
    const input = document.getElementById(id);
    try {
      await CalendarService.update(id, {
        result: value,
        description: input.value,
      });
      this.loadInfo();
    } catch {}
  };

  getDate = (time) => {
    const hours = time.hours();
    const minutes = time.minutes();
    const date = moment(this.state.date);
    date.set({ hour: hours, minute: minutes });
    return date;
  };
  validator = (values) => {
    const errors = {};
    const date = this.getDate(values.time);

    if (moment(date).isBefore(Date.now())) {
      errors.time = "Нельзя создавать события в прошлом";
    }
    if (!values.name) {
      errors.name = "Обязательно к заполнению";
    }
    if (!values.time) {
      errors.time = "Обязательно к заполнению";
    }
    if (!values.review) {
      errors.review = "Обязательно к заполнению";
    }
    if (!values.type) {
      errors.type = "Обязательно к заполнению";
    }
    return errors;
  };

  render() {
    const { reviews, events } = this.state;
    const dayEvents = events.filter((event) =>
      moment(event.date).isSame(this.state.date, "day")
    );
    return (
      <main className="col-12 bonuce h-100">
        <h3>Календарь собеседований</h3>
        <div className="d-flex calendar-view">
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
          <div className="m-3 col-12 col-md-5 col-lg-4 mx-auto m-3  d-flex flex-column justify-content-around">
            <div>
              <h4>Добавить событие:</h4>
              <Formik
                validate={this.validator}
                onSubmit={this.onSubmit}
                initialValues={{
                  employee: "",
                  review: "",
                  date: this.state.date,
                  time: "",
                  name: "",
                  type: "",
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
                  setFieldValue,
                }) => (
                  <form
                    autoComplete="off"
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
                    <ErrorMsg name="name" component="div" />

                    <span>Время</span>
                    <Datetime
                      dateFormat={false}
                      className="m-3 w-100 mx-auto"
                      name="time"
                      value={values.time}
                      onChange={(e) => setFieldValue("time", e)}
                    />
                    <ErrorMsg name="time" component="div" />
                    <select
                      className="mb-3"
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                    >
                      <option value="" disabled label="Тип собеседования" />
                      <option value="hr">Собеседование с рекрутером</option>
                      <option value="technical">
                        Техническое собеседование
                      </option>
                      ))
                    </select>
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
                          {`${review.surname} ${review.name} ${review.patronymic}`}
                        </option>
                      ))}
                    </select>
                    <ErrorMsg name="review" component="div" />
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary mx-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Добавить событие
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div>
          {!!dayEvents.length && (
            <div className="m-3">
              <h4>События на этот день:</h4>
            </div>
          )}
          {dayEvents.map((event) => (
            <ul
              key={event._id}
              className="list-unstyled list-group-item list-group-item-action m-3 mx-auto col-12 col-md-5 col-lg-4 text-left d-flex justify-content-between"
            >
              <div>
                <h5 className="mt-3 w-20">
                  {moment(`${event.date}`).format("MMMM Do, H:mm")}
                </h5>
              </div>
              <div>
                <h5>{event.name}</h5>
                <p>{typeReview[event.type]}</p>
                {event.review && (
                  <p>{`${event.review.surname && event.review.surname} ${
                    event.review.name && event.review.name
                  } ${event.review.patronymic && event.review.patronymic}`}</p>
                )}
                {typeof event.result === "undefined" && (
                  <div>
                    <p>
                      <i>Кандидат подходит?</i>
                    </p>
                    <span>Комментарий</span>
                    <input
                      className="m-3 w-100 mx-auto"
                      type="text"
                      name="description"
                      id={event._id}
                    />
                    <button
                      style={{ height: "40px", width: "max-content" }}
                      className="btn btn-primary m-1"
                      onClick={() => {
                        this.resultFunc(event._id, true);
                      }}
                    >
                      Да
                    </button>
                    <button
                      style={{ height: "40px", width: "max-content" }}
                      className="btn btn-primary m-1"
                      onClick={() => this.resultFunc(event._id, false)}
                    >
                      Нет
                    </button>
                  </div>
                )}
                {typeof event.result !== "undefined" && (
                  <div>
                    <p>
                      <i>Результат: </i>
                      {resultEvent[event.result]}
                    </p>
                    {event.description && (
                      <p>
                        <i>Комментарий: </i>
                        {event.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <button
                style={{ height: "40px", width: "40px" }}
                className="btn btn-primary m-3"
                onClick={() => this.deleteInfo(event._id)}
              >
                -
              </button>
            </ul>
          ))}
        </div>
      </main>
    );
  }
}

export default Calendar;
