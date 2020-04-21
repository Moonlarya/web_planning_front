import ApiService from "./ApiService";

class ReviewsService extends ApiService {
  getSlug() {
    return "reviwes";
  }
}

export default new ReviewsService();
