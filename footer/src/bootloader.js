import { createApp } from "vue";

window.headers.get('./Header').then((data) => {
    const Header = data().default;
    new Header({
      target:document.getElementById("header")
    })
  })
  
import "./index.scss";

import App from "./App.vue";

createApp(App).mount("#app");
