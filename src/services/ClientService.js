import ApiService from "./ApiService";

class ClientService extends ApiService {
  getSlug() {
    return "clients";
  }
}

export default new ClientService();
