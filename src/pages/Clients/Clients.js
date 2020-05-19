import React, { Component } from "react";
import ClientService from "../../services/ClientService";
import { Link } from "react-router-dom";

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
        <Link to="/addclient" className="btn btn-primary mt-3">
          Добавить клиента
        </Link>
        <div className="d-flex flex-wrap">
          {clients.map((client) => (
            <div className="card col-3" key={client._id}>
              <h5 className="card-header">{client.name}</h5>
              <p className="card-text">e-mail: {client.email}</p>
              <p className="card-text">+380{client.phone}</p>
              <div
                className="btn btn-primary m-1"
                onClick={() => this.deleteClient(client._id)}
              >
                Удалить клиента
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Clients;
