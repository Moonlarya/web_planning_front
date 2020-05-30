import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";
import TasksService from "../../services/TasksService";
import { Formik } from "formik";

class AddReport extends Component {
  onSubmit = async (values) => {
    const { taskId } = this.props.match.params;
    const submitValues = { ...values, taskId };
    try {
      await ReportsService.create(submitValues);
      this.props.history.push("/report");
    } catch {}
  };
  render() {
    console.log();
    return (
      <div>
        <h1>Создать отчет</h1>
        <Formik
          /* validate={(values) => {
            if (values.name.length < 3) return { name: "err" };
          }}*/
          onSubmit={this.onSubmit}
          initialValues={{ link: "", date: "", points: "" }}
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
              className="d-flex flex-column mt-3 p-3 col-3 mx-auto"
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

              <button
                type="submit"
                className="btn btn-primary m-1"
                disabled={isSubmitting}
              >
                Создать отчет
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddReport;
