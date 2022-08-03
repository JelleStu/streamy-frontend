import axios from "axios";
import qs from "qs";
import router from "@/router";
import store from "@/store";
const API_URL = "http://35.195.224.224:8082/users/login";
//const API_URL = "http://localhost:8082/users/login";

class AuthService {
  //Creates a POST request to backend to check if the credentials are correct.
  //If the response has a accessToken, the token will be stored under the user in the localstorage.
  login(user) {
    var data = qs.stringify({
      username: user.username,
      password: user.password,
    });
    return axios({
      method: "POST",
      url: API_URL,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    }).then((response) => {
      let accessToken = JSON.stringify(response.data.access_token);
      let refreshToken = JSON.stringify(response.data.refresh_token);
      const removedQuationAccess = accessToken.replaceAll('"', "");
      const removedQuationRefresh = refreshToken.replaceAll('"', "");
      console.log(response.data);
      localStorage.setItem("access_token", removedQuationAccess);
      localStorage.setItem("refresh_token", removedQuationRefresh);
      if (response.status === 200) {
        router.push("/movies");
        store.commit("setEmail", user.username);
        store.commit("setLoggedIn", true);
      }

      return response.data;
    });
  }

  logout() {
    store.commit("setLoggedIn", false);
    store.commit("setEmail", "");

    router.push("/");
  }
}

export default new AuthService();
