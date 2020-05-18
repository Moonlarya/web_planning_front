import React, { Component, Fragment } from "react";
import ReportsService from "../../services/ReportsService";
import { Formik } from "formik";

class AddReport extends Component {
  onSubmit = async (values) => {
    try {
      console.log(values);
      await ReportsService.create(values);
      this.props.history.push("/report");
    } catch {}
  };
  render() {
    return (
      <div>
        <h1>Создать отчет</h1>
        <Formik
          /* validate={(values) => {
            if (values.name.length < 3) return { name: "err" };
          }}*/
          onSubmit={this.onSubmit}
          initialValues={{ link: "", date: "", points: "", status: "" }}
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
              <span>Ссылка</span>
              <input
                className="mb-3"
                type="text"
                name="link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
              />
              {errors.link && touched.link && errors.link}
              <span>Дата</span>
              <input
                className="mb-3"
                type="text"
                name="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
              />
              {errors.date && touched.date && errors.date}
              <span>Очки</span>
              <input
                className="mb-3"
                type="text"
                name="points"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.points}
              />
              {errors.points && touched.points && errors.points}
              <span>Статус</span>
              <input
                className="mb-3"
                type="text"
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
              />
              {errors.status && touched.status && errors.status}
              <span>Исполнитель</span>
              <input
                className="mb-3"
                type="text"
                name="employee"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employee}
              />
              {errors.employee && touched.employee && errors.employee}
              <span>Задача</span>
              <input
                className="mb-3"
                type="text"
                name="task"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.task}
              />
              {errors.task && touched.task && errors.task}
              <button
                type="submit"
                className="btn btn-primary m-1"
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

export default AddReport;
