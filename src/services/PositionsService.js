import ApiService from "./ApiService";

class PositionsService extends ApiService {
  getSlug() {
    return "positions";
  }
}

export default new PositionsService();
