import React, { Component } from "react";

import TasksService from "../../services/TasksService";
import EmployeesService from "../../services/EmployeesService";
import ProjectService from "../../services/ProjectService";

import Datetime from "react-datetime";

import "../../style/datetime.css";
import { ErrorMsg } from "../SignIn/view";

import * as moment from "moment";

import { Formik } from "formik";

class EditTask extends Component {
  state = {
    task: null,
    employees: [],
    projects: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const employees = await EmployeesService.getAll();
    const projects = await ProjectService.getAll();
    const task = await TasksService.get(id);
    this.setState({ task, employees, projects });
  }
  validator = (values) => {
    const errors = {};
    if (moment(this.state.task.createdAt).isSameOrAfter(values.deadline)) {
      errors.deadline = "Срок сдачи задания должен быть позже даты создания";
    }
    return errors;
  };
  onSubmit = async (values, { setErrors }) => {
    try {
      const { id } = this.props.match.params;
      await TasksService.update(id, values);
      this.props.history.push("/task");
    } catch (e) {
      setErrors({ error: e.response.data.message });
    }
  };
  render() {
    const { employees, task, projects } = this.state;
    if (!employees || !task || !projects) {
      return null;
    }
    return (
      <div className="col-3 mt-3 p-3 mx-auto">
        <h4>Изменить задачу</h4>
        <Formik
          onSubmit={this.onSubmit}
          validate={this.validator}
          initialValues={{
            description: task.description,
            name: task.name,
            order: task.order,
            bonuce: task.bonuce,
            deadline: task.deadline,
            employee: task.employee,
            project: task.project,
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
            setFieldValue,
          }) => (
            <form
              autoComplete="off"
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
              <ErrorMsg name="name" component="div" />
              <span>Описание</span>
              <textarea
                className="mb-3"
                type="text"
                style={{ resize: "none" }}
                cols="300"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMsg name="description" component="div" />

              <span>Срок выполнения</span>
              <Datetime
                className="mb-3"
                name="deadline"
                value={moment(values.deadline).format("Do MMMM YYYY")}
                onChange={(e) => setFieldValue("deadline", e)}
              />
              <ErrorMsg name="deadline" component="div" />
              <span>Количество бонусов</span>
              <input
                className="mb-3"
                type="text"
                name="bonuce"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bonuce}
              />
              <ErrorMsg name="bonuce" component="div" />
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
              <ErrorMsg name="employee" component="div" />

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
              <ErrorMsg name="project" component="div" />
              <p>{errors.error}</p>
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

export default EditTask;
