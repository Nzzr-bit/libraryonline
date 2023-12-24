import { defineStore } from "pinia";
import router from "../router";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    is_auth: JSON.parse(localStorage.getItem("is_auth")),
  }),
  actions: {
    login(user) {
      axios
        .post(JSON.parse(localStorage.getItem("server_url")) + "/api/auth", {
          login: user["login"],
          password: user["password"],
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.is_auth = true;
            this.user = response.data;
            console.log(this.user);
            localStorage.setItem("user", JSON.stringify(this.user));
            localStorage.setItem("is_auth", JSON.stringify(this.is_auth));
            router.push("/");
            return true;
          } else {
            // Обработка ошибок при авторизации
            console.error(response.data.message);
            return false;
          }
        })
        .catch((error) => {
          // Обработка ошибок при выполнении запроса
          console.error(error);
          return false;
        });
    },
    register(user) {
      try {
        console.log(user);
        axios
          .post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/add_user",
            { ...user, login: user["login"], password: user["password"] }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data === 0) {
              this.login(user);
              return 0;
            } else return -1;
          });
      } catch (err) {
        console.log(err);
        return -1;
      }
    },
    update(user) {
      try {
        console.log(user);
        //    Отправка данных в бд
        this.user["u_fio"] = user["fio"];
        this.user["u_type"] = user["type"];
        this.user["login"] = user["login"];
        this.user["password"] = user["password"];
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("is_auth", JSON.stringify(this.is_auth));
        return 0;
      } catch (err) {
        console.log(err);
        return -1;
      }
    },
    logout() {
      this.user = null;
      this.is_auth = false;
      localStorage.removeItem("user");
      localStorage.removeItem("is_auth");
    },
  },
  getters: {
    auth: (state) => {
      return state.is_auth;
    },
    current_user: (state) => {
      return state.user;
    },
  },
});
