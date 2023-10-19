import api from "../api-source";

class StatsDataService {
  get() {
    return api.get("/stats");
  }
}
export default new StatsDataService();