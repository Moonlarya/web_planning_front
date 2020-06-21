import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import ClientService from "../../services/ClientService";
import * as moment from "moment";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";
import Datetime from "react-datetime";
import "../../style/datetime.css";

class AddProject extends Component {
  state = {
    clients: [],
  };
  async componentDidMount() {
    const clients = await ClientService.getAll();
    this.setState({ clients: clients });
  }
  validate = (values) => {
    const errors = {};
    if (isNaN(values.budget)) {
      errors.budget = "Пожалуйста, введите цифры!";
    }
    if (values.budget < 0) {
      errors.budget = "Бюджет не может быть отрицательным";
    }
    if (moment(values.deadline).isBefore(Date.now())) {
      errors.budget = "Дедлайн не может быть раньше текушей даты!";
    }
    return errors;
  };
  onSubmit = async (values) => {
    try {
      await ProjectService.create(values);
      this.props.history.push("/projects");
    } catch {}
  };
  render() {
    const { clients } = this.state;
    return (
      <div className="col-12 col-md-5 col-lg-4 mx-auto m-3 ">
        <h4>Добавить проект</h4>
        <Formik
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={{
            name: "",
            description: "",
            deadline: "",
            budget: "",
            clientId: "",
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
              className="d-flex flex-column mt-3 mx-auto"
            >
              <span>Название проекта</span>
              <input
                className="mb-3"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMsg name="name" component="div" />
              <span>Описание</span>
              <textarea
                cols="500"
                style={{ resize: "none" }}
                className="mb-3"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMsg name="description" component="div" />
              <span>Срок</span>
              <Datetime
                className="mb-3"
                name="deadline"
                value={values["deadline"]}
                onChange={(e) => setFieldValue("deadline", e)}
              />

              <ErrorMsg name="deadline" component="div" />
              <span>Заказчик</span>
              <select
                className="mb-3"
                type="text"
                name="clientId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.clientId}
              >
                <option value="" disabled label="Выберите заказчика" />
                {clients.map((client) => (
                  <option value={client._id} key={client._id}>
                    {`${client.surname} ${client.name} ${client.patronymic}`}
                  </option>
                ))}
              </select>

              <ErrorMsg name="clientId" component="div" />
              <span>Бюджет</span>
              <input
                className="mb-3"
                type="text"
                name="budget"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.budget}
              />
              <ErrorMsg name="budget" component="div" />
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

export default AddProject;
