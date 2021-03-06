import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import ClientService from "../../services/ClientService";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";
import Datetime from "react-datetime";
import "../../style/datetime.css";
import * as moment from "moment";

class EditProject extends Component {
  state = {
    clients: [],
    project: null,
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const clients = await ClientService.getAll();
    const project = await ProjectService.get(id);
    this.setState({ clients, project });
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
      console.log(values);
      const { id } = this.props.match.params;
      await ProjectService.update(id, values);
      this.props.history.push("/projects");
    } catch {}
  };
  render() {
    const { clients, project } = this.state;
    if (!clients || !project) {
      return null;
    }
    return (
      <div className="col-12 col-md-5 col-lg-4 mx-auto m-3">
        <h4>Изменить проект</h4>
        <Formik
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={{
            name: project.name,
            description: project.description,
            deadline: project.deadline,
            budget: project.budget,
            clientId: project.clientId,
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
                cols="300"
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
                value={moment(values.deadline).format("Do MMMM YYYY")}
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

export default EditProject;
