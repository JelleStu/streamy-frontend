//Creates POST request to backend to register a user
import axios from "axios";
import store from "@/store";
const API_URL = "http://35.195.224.224:8082/users/users/register";
//const API_URL = "http://localhost:8082/users/users/register";

class RegisterService {
  register(user) {
    const data = JSON.stringify({
      id: null,
      email: user.username,
      name: user.name,
      password: user.password,
      roles: null,
      iban: user.iban,
    });
    return axios({
      method: "POST",
      url: API_URL,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    })
      .then((resonse) => {
        if (resonse.status === 200) {
          store.dispatch("auth/login", user);
          store.commit("setEmail", user.username);
          store.commit("setLoggedIn", true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export default new RegisterService();
