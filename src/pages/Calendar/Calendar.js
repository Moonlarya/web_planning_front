import React, { Component } from "react";
import CalendarView from "react-calendar";
import "../../style/Calendar.css";
import ReviewsService from "../../services/ReviewsService";
import CalendarService from "../../services/CalendarService";
import { Formik } from "formik";
import * as moment from "moment";
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
    try {
      values.date = this.state.date;
      await CalendarService.create(values);
      this.loadInfo();
    } catch {}
  };
  resultFunc = async (id, value) => {
    try {
      await CalendarService.update(id, { result: value });
      this.loadInfo();
    } catch {}
  };
  validator = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.time) {
      errors.time = "Required";
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
                validate={this.validator}
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
                      ))}
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
          {!!dayEvents.length && <h5>События на этот день:</h5>}
          {dayEvents.map((event) => (
            <ul
              key={event._id}
              className="list-unstyled list-group-item list-group-item-action col-6 text-left d-flex justify-content-between mx-auto"
            >
              <div className="px-5">
                {console.log(event.type)}
                <h2 className="mt-3">{event.time}</h2>
              </div>
              <div>
                <h5>{event.name}</h5>
                <p>{event.description}</p>
                <p>{typeReview[event.type]}</p>
                <p>{`${event.review.surname && event.review.surname} ${
                  event.review.name && event.review.name
                } ${event.review.patronymic && event.review.patronymic}`}</p>
                {typeof event.result === "undefined" && (
                  <div>
                    <p>
                      <i>Кандидат подходит?</i>
                    </p>
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
                  <p>
                    <i>Результат: </i>
                    {resultEvent[event.result]}
                  </p>
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
