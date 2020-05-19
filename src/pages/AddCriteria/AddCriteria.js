import React, { Component } from "react";
import CriteriasService from "../../services/CriteriasService";
import { Formik } from "formik";

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
              onSubmit={handleSubmit}
              className="d-flex flex-column mt-3 p-3 mx-auto"
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
              {errors.name && touched.name && errors.name}
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
