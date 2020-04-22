import React, { Component, Fragment } from "react";
import ProjectService from "../../services/ProjectService";
import { Formik } from "formik";

class AddProject extends Component {
  onSubmit = (values) => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <h1>Добавить проект</h1>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            email: "",
            name: "",
            owner: "",
            description: "",
            deadline: "",
            budget: "",
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
              className="d-flex flex-column formCreate"
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
              <input
                className="mb-3"
                type="text"
                name="owner"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.owner}
              />
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
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddProject;
