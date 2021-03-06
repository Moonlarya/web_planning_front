import React, { Component } from "react";

import ReportsService from "../../services/ReportsService";
import TasksService from "../../services/TasksService";

import { ErrorMsg } from "../SignIn/view";
import { Formik } from "formik";

class AddReport extends Component {
  onSubmit = async (values) => {
    const { taskId } = this.props.match.params;
    try {
      const task = await TasksService.get(taskId);

      const submitValues = {
        ...values,
        taskId,
        project: task.project,
        date: Date.now(),
      };
      await ReportsService.create(submitValues);
      this.props.history.push("/report");
    } catch {}
  };
  render() {
    return (
      <div>
        <h1>Создать отчет</h1>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{ link: "", status: "active" }}
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
              <ErrorMsg name="link" component="div" />
              <span>Описание</span>
              <textarea
                className="mb-3"
                type="text"
                cols="300"
                style={{ resize: "none" }}
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />

              <ErrorMsg name="description" component="div" />
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
