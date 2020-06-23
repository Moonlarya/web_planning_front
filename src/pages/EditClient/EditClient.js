import React, { Component } from "react";
import ClientService from "../../services/ClientService";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";
import InputMask from "react-input-mask";

class EditClient extends Component {
  state = {
    client: null,
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const client = await ClientService.get(id);
    this.setState({ client });
  };
  onSubmit = async (values) => {
    console.log(values);
    try {
      const { id } = this.props.match.params;
      await ClientService.update(id, values);
      this.props.history.push("/clients");
    } catch {}
  };

  validator = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Обязательно к заполнению";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Неверно указана электронная почта";
    }
    if (!values.phone) {
      errors.phone = "Обязательно к заполнению";
    }
    if (!values.name) {
      errors.name = "Обязательно к заполнению";
    }
    return errors;
  };

  render() {
    const { client } = this.state;
    if (!client) {
      return null;
    }
    return (
      <div className="col-12 col-md-5 col-lg-4 mx-auto m-3">
        <h3>Изменить информацию о клиенте</h3>
        <Formik
          validate={this.validator}
          onSubmit={this.onSubmit}
          initialValues={{
            email: client.email,
            surname: client.surname,
            name: client.name,
            patronymic: client.patronymic,
            phone: client.phone,
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
          }) => (
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="d-flex flex-column mt-3 p-3 mx-auto"
            >
              <span>e-mail клиента</span>
              <input
                className="mb-3"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMsg name="email" component="div" />
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
              <span>Имя (Название компании)</span>
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
              <span>Телефон</span>
              <InputMask
                className="mb-3"
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                {...this.props}
                mask="+99\(999) 999 99 99"
                maskChar=" "
              />
              <ErrorMsg name="phone" component="div" />
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

export default EditClient;
