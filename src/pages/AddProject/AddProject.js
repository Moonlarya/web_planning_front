import React, { Component, Fragment } from "react";
import ProjectService from "../../services/ProjectService";
import ClientService from "../../services/ClientService";
import { Formik } from "formik";

class AddProject extends Component {
  state = {
    clients: [],
  };
  async componentDidMount() {
    const clients = await ClientService.getAll();
    this.setState({ clients: clients });
  }

  onSubmit = async (values) => {
    try {
      await ProjectService.create(values);
      this.props.history.push("/projects");
    } catch {}
  };
  render() {
    const { clients } = this.state;
    return (
      <div className="col-3 mt-3 p-3 mx-auto">
        <h4>Добавить проект</h4>
        <Formik
          onSubmit={this.onSubmit}
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
            /* and other goodies */
          }) => (
            <form
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
              {errors.name && touched.name && errors.name}
              <span>Описание</span>
              <input
                className="mb-3"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              <span>Срок</span>
              <input
                className="mb-3"
                type="text"
                name="deadline"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deadline}
              />
              {errors.deadline && touched.deadline && errors.deadline}
              <span>Заказчик</span>
              <select
                className="mb-3"
                type="text"
                name="clientId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.clientId}
              >
                <option value="" label="Выберите заказчика" />
                {clients.map((client) => (
                  <option value={client._id} key={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors.deadline && touched.deadline && errors.deadline}
              <span>Бюджет</span>
              <input
                className="mb-3"
                type="text"
                name="budget"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.budget}
              />
              {errors.budget && touched.budget && errors.budget}
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
