import React, { Component } from "react";
import ReviewsService from "../../services/ReviewsService";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";

class EditReview extends Component {
  state = {
    review: null,
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const review = await ReviewsService.get(id);
    this.setState({ review });
  };
  onSubmit = async (values) => {
    try {
      const { id } = this.props.match.params;
      await ReviewsService.update(id, values);
      this.props.history.push("/review");
    } catch {}
  };
  render() {
    const { review } = this.state;
    if (!review) {
      return null;
    }
    return (
      <div className="col-3 mt-3 p-3 mx-auto">
        <h3>Изменить резюме</h3>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            surname: review.surname,
            name: review.name,
            patronymic: review.patronymic,
            description: review.description,
            type: review.type,
            email: review.email,
            phone: review.phone,
            priority: review.priority,
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
              autoComplete="off"
              onSubmit={handleSubmit}
              className="d-flex flex-column formCreate"
            >
              <span>Фамилия</span>
              <input
                className="mb-3"
                type="text"
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
              <ErrorMsg name="surname" component="div" />
              <span>Имя</span>
              <input
                className="mb-3"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              <ErrorMsg name="name" component="div" />
              <span>Отчество</span>
              <input
                className="mb-3"
                type="text"
                name="patronymic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.patronymic}
              />

              <ErrorMsg name="patronymic" component="div" />
              <span>Комментарий</span>
              <input
                className="mb-3"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />

              <ErrorMsg name="description" component="div" />
              <span>e-mail</span>
              <input
                className="mb-3"
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMsg name="email" component="div" />
              <span>Должность</span>
              <select
                className="mb-3"
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
              >
                <option value="" disabled label="Должность" />
                <option value="marketolog">Маркетолог</option>
                <option value="copywriter">Копирайтер</option>
                <option value="designer">Дизайнер</option>
                <option value="developer">Разработчик</option>
                <option value="hr">HR (рекрутер)</option>
              </select>
              <ErrorMsg name="type" component="div" />
              <span>Номер телефона</span>
              <input
                className="mb-3"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <ErrorMsg name="phone" component="div" />
              <span>Приоритет</span>
              <input
                className="mb-3"
                type="text"
                name="priority"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priority}
              />
              <ErrorMsg name="priority" component="div" />

              <button
                type="submit"
                className="btn btn-primary m-1"
                disabled={isSubmitting}
              >
                Сохранить
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default EditReview;
