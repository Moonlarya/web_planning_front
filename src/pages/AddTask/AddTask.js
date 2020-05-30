import React, { Component } from "react";

import TasksService from "../../services/TasksService";
import EmployeesService from "../../services/EmployeesService";
import ProjectService from "../../services/ProjectService";

import { Formik } from "formik";

class AddTask extends Component {
  state = {
    employees: [],
    projects: [],
  };
  async componentDidMount() {
    const employees = await EmployeesService.getAll();
    const projects = await ProjectService.getAll();
    this.setState({ employees: employees, projects: projects });
  }

  onSubmit = async (values, { setErrors }) => {
    try {
      await TasksService.create(values);
      this.props.history.push("/task");
    } catch (e) {
      setErrors({ error: e.response.data.message });
    }
  };
  render() {
    const { employees, projects } = this.state;
    return (
      <div className="col-3 mt-3 p-3 mx-auto">
        <h4>Добавить задачу</h4>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            description: "",
            name: "",
            order: "",
            bonuce: "",
            deadline: "",
            employee: "",
            project: "",
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
                name="bonuce"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bonuce}
              />
              <span>Исполнитель</span>
              <select
                className="mb-3"
                name="employee"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employee}
              >
                <option value="" disabled label="Выберите исполнителя" />
                {employees.map((employee) => (
                  <option value={employee._id} key={employee._id}>
                    {`${employee.surname} ${employee.name} ${employee.patronymic}`}
                  </option>
                ))}
              </select>
              {errors.employee && touched.employee && errors.employee}

              <span>Проект</span>
              <select
                className="mb-3"
                name="project"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.project}
              >
                <option value="" disabled label="Выберите проект" />
                {projects.map((project) => (
                  <option value={project._id} key={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.project && touched.project && errors.project}
              <p>{errors.error}</p>
              <button
                type="submit"
                className="btn btn-primary m-1"
                disabled={isSubmitting}
              >
                Создать
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddTask;
