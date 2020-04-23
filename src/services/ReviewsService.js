import ApiService from "./ApiService";

class ReviewsService extends ApiService {
  getSlug() {
    return "reviews";
  }
}

export default new ReviewsService();
