import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./assets/main.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/md-light-deeppurple/theme.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

localStorage.setItem("server_url", JSON.stringify("http://localhost:8000"));
app.mount("#app");
