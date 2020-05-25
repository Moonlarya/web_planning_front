import ApiService from "./ApiService";

class CalendarService extends ApiService {
  getSlug() {
    return "calendar";
  }
}

export default new CalendarService();
