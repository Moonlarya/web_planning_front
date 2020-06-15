import React, { Component } from "react";

import ReportsService from "../../services/ReportsService";

import { Formik } from "formik";

class AddReport extends Component {
  state = {
    report: null,
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const report = await ReportsService.get(id);
    this.setState({ report });
  };

  onSubmit = async (values) => {
    try {
      const { id } = this.props.match.params;
      await ReportsService.update(id, values);
      this.props.history.push("/report");
    } catch {}
  };
  render() {
    const { report } = this.state;
    if (!report) {
      return null;
    }
    return (
      <div>
        <h1>Изменить отчет</h1>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{ link: report.link, description: report.description }}
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
              className="d-flex flex-column col-12 col-md-5 col-lg-4 mx-auto m-3"
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
              {errors.description && touched.description && errors.description}
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

export default AddReport;
