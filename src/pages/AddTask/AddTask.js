import React, { Component, Fragment } from "react";
import TasksService from "../../services/TasksService";
import { Formik } from "formik";

class AddTask extends Component {
  onSubmit = (values) => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <h1>Добавить задачу</h1>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            description: "",
            name: "",
            order: "",
            bonuces: "",
            deadline: "",
            owner: "",
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
              <span>Название</span>
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
              <span>Порядковый номер</span>
              <input
                className="mb-3"
                type="text"
                name="order"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.order}
              />
              {errors.order && touched.order && errors.order}
              <span>Срок выполнения</span>
              <input
                className="mb-3"
                type="text"
                name="deadline"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deadline}
              />
              {errors.deadline && touched.deadline && errors.deadline}
              <span>Количество бонусов</span>
              <input
                className="mb-3"
                type="text"
                name="bonuces"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bonuces}
              />
              <span>Исполнитель</span>
              <select
                className="mb-3"
                type="text"
                name="owner"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.owner}
              >
                <option>Marina Humeniuk</option>
                <option>Darth Veider</option>
              </select>
              {errors.bonuces && touched.bonuces && errors.bonuces}
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

export default AddTask;
