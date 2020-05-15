import ApiService from "./ApiService";

class ReviewsService extends ApiService {
  getSlug() {
    return "reviews";
  }
  async createEmployee(id) {
    const response = await this.api.post(this.getSlug() + "/create-employee", {
      reviewId: id,
    });
    return response.data;
  }
}

export default new ReviewsService();
