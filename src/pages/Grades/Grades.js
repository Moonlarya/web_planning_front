import React, { Component } from "react";
import { Link } from "react-router-dom";
import CriteriasService from "../../services/CriteriasService";

class Grades extends Component {
  state = {
    criterias: [],
  };
  loadInfo = async () => {
    const criterias = await CriteriasService.getAll();
    this.setState({ criterias: criterias });
  };
  deleteInfo = async (id) => {
    await CriteriasService.delete(id);
    this.loadInfo();
  };
  componentDidMount = () => {
    this.loadInfo();
  };
  render() {
    const { criterias } = this.state;
    return (
      <div>
        <h3 className="m-3">Оценивание персонала</h3>
        <Link to="/addcriteria" className="btn btn-primary mt-3">
          Добавить фактор
        </Link>
        {criterias.length > 0 && (
          <h5 className="m-3 text-left">
            На данный момент оценивание проходит по таким факторам:
          </h5>
        )}
        <ul className="text-left list-group col-3">
          {criterias.map((el) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {el.name}
              <div
                className="btn btn-primary mx-3 rounded-circle px-2.7"
                onClick={() => this.deleteInfo(el._id)}
              >
                −
              </div>
            </li>
          ))}
        </ul>
        <h4>Результаты предыдущего тестирования:</h4>
        <div className="card col-3">
          <h3>Имя сотрудника</h3>
          <p>Должность: </p>
          <p>Оценка1:2 </p>
          <p>Оценка2:4</p>
        </div>
      </div>
    );
  }
}

export default Grades;
