import React, { Component } from "react";
import EmployeesService from "../../services/EmployeesService";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";

class EditEmployee extends Component {
  state = {
    employee: null,
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const employee = await EmployeesService.get(id);
    this.setState({ employee });
  }
  onSubmit = async (values) => {
    try {
      const { id } = this.props.match.params;
      await EmployeesService.update(id, values);
      this.props.history.push("/employees");
    } catch {}
  };
  render() {
    const { employee } = this.state;
    if (!employee) {
      return null;
    }
    return (
      <div className="col-3 mt-3 p-3 mx-auto">
        <h3>Изменить информацию о сотруднике</h3>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            surname: employee.surname,
            name: employee.name,
            patronymic: employee.patronymic,
            type: employee.type,
            email: employee.email,
            phone: employee.phone,
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

export default EditEmployee;
