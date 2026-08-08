import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router"; // <-- Importamos el router

const app = createApp(App);
app.use(router); // <-- Lo conectamos a la instancia de Vue
app.mount("#app");
