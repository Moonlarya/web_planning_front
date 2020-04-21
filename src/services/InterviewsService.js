import ApiService from "./ApiService";

class InterviewsService extends ApiService {
  getSlug() {
    return "interviews";
  }
}

export default new InterviewsService();
