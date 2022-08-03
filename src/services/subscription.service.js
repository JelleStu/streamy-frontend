import axios from "axios";

const API_URL = "http://35.195.224.224:8082/subscription/subscription/user?userid=";

class SubscriptionService {
  getSubscription(id) {
    return axios({
      method: "GET",
      url: API_URL + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      return response;
    });
  }
}
export default new SubscriptionService();
