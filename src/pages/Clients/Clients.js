import React, { Component } from "react";
import ClientService from "../../services/ClientService";
import { Link } from "react-router-dom";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Clients extends Component {
  state = {
    clients: [],
  };
  loadClients = async () => {
    const clients = await ClientService.getAll();
    this.setState({ clients: clients });
  };
  async componentDidMount() {
    this.loadClients();
  }
  deleteClient = async (id) => {
    await ClientService.delete(id);
    this.loadClients();
  };
  render() {
    const { clients } = this.state;
    return (
      <div>
        <h3 className="m-3">Клиенты</h3>
        <Link to="/addclient" className="btn btn-primary mt-3">
          Добавить клиента
        </Link>
        <div className="d-flex flex-wrap justify-content-center">
          {clients.map((client) => (
            <div
              className="card col-8 col-md-5 col-lg-3 mx-auto m-3"
              key={client._id}
            >
              <h5 className="card-header">{`${client.surname} ${client.name} ${client.patronymic}`}</h5>
              <p className="card-text">e-mail: {client.email}</p>
              <p className="card-text">{client.phone}</p>
              <Link
                className="btn btn-primary m-1"
                to={`/client/${client._id}`}
              >
                <FontAwesomeIcon icon={faEdit} color="blue" />
                <span className="visibleHeaders"> Изменить</span>
              </Link>
              <div
                className="btn btn-outline-danger m-1"
                onClick={() => this.deleteClient(client._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
                <span className="visibleHeaders"> Удалить клиента</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Clients;
