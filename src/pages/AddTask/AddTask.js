import React, { Component, Fragment } from "react";
import TasksService from "../../services/TasksService";
import EmployeesService from "../../services/EmployeesService";
import { Formik } from "formik";

class AddTask extends Component {
  state = {
    employees: [],
  };
  async componentDidMount() {
    const employees = await EmployeesService.getAll();
    this.setState({ employees: employees });
  }

  onSubmit = async (values) => {
    try {
      await TasksService.create(values);
      this.props.history.push("/task");
    } catch {}
  };
  render() {
    const { employees } = this.state;
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
            employee: "",
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
                name="employee"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employee}
              >
                <option value="" label="Выберите исполнителя" />
                {employees.map((employee) => (
                  <option value={employee._id} key={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              {errors.employee && touched.employee && errors.employee}
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
