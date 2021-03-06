import React, { Component } from "react";
import CriteriasService from "../../services/CriteriasService";
import { Formik } from "formik";
import { ErrorMsg } from "../SignIn/view";

class AddCriteria extends Component {
  onSubmit = async (values) => {
    try {
      await CriteriasService.create(values);
      this.props.history.push("/grades");
    } catch {}
  };
  render() {
    return (
      <div className="d-flex flex-column mt-3 p-3 mx-auto">
        <h4>Добавить фактор оценивания</h4>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            name: "",
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
              autoComplete="off"
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
              className="d-flex flex-column col-10 col-md-5 col-lg-4 mx-auto m-3 "
            >
              <span>Название фактора</span>
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
                className="mb-3"
                type="text"
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
                Сохранить
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddCriteria;
