import ApiService from "./ApiService";

class CriteriasService extends ApiService {
  getSlug() {
    return "criterias";
  }
}

export default new CriteriasService();
