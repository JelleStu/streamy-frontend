import axios from "axios";
import store from "@/store";

const API_URL = "http://35.195.224.224:8082/users/users/";
//const API_URL = "http://localhost:8082/users/users/";

class UserService {
  getUser() {
    return axios({
      method: "GET",
      url: API_URL + "user?email=" + store.state.userData,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      },
    }).then((response) => {
      return response.data;
    });
  }
  updateUser(user) {
    return axios({
      method: "PUT",
      url: API_URL + "user?id=" + user.id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      },
      data: user,
    }).finally((response) => {
      store.commit("setEmail", user.email);
      return response;
    });
  }
  deleteUser(user) {
    return axios({
      method: "DELETE",
      url: API_URL + "user?id=" + user.id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      },
      data: user,
    }).then((response) => {
      return response;
    });
  }
}

export default new UserService();
