import React, { Component, Fragment } from "react";
import ClientService from "../../services/ClientService";
import { Link } from "react-router-dom";

class Clients extends Component {
  state = {
    clients: [],
  };
  async componentDidMount() {
    const clients = await ClientService.getAll();
    this.setState({ clients: clients });
  }
  render() {
    const { clients } = this.state;
    return (
      <div>
        <Link to="/addclient" className="btn btn-primary mt-3">
          Добавить клиента
        </Link>
        <div className="d-flex flex-wrap">
          {clients.map((client) => (
            <div className="card col-3" key={client._id}>
              <h5 className="card-header">{client.name}</h5>
              <p className="card-text">e-mail: {client.email}</p>
              <p className="card-text">+380{client.phone}</p>
              <div className="btn btn-primary">Удалить клиента</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Clients;
