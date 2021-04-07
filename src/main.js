import Vue from "vue";
import App from "./App.vue";
//import Keycloak from "keycloak-js";
import Logs from "vuejs-logger";

Vue.config.productionTip = false;
Vue.use(Logs);

// const keycloakInitOptions = {
//   url: `http://${process.env.VUE_APP_KEYCLOAK_HOST}:${process.env.VUE_APP_KEYCLOAK_PORT}/auth`,
//   realm: process.env.VUE_APP_KEYCLOAK_REALM,
//   clientId: process.env.VUE_APP_KEYCLOAK_CLIENT,
//   onLoad: "login-required",
// };

// const keycloak = Keycloak(keycloakInitOptions);
// keycloak
//   .init({ onLoad: keycloakInitOptions.onLoad })
//   .then((auth) => {
//     if (!auth) window.location.reload();

//     localStorage.setItem("token", keycloak.token);
//     localStorage.setItem("refresh-token", keycloak.refreshToken);

    new Vue({
      render: (h) => h(App),
    }).$mount("#app");

//     setInterval(() => {
//       keycloak
//         .updateToken(70)
//         .then((refreshed) => {
//           if (refreshed) Vue.$log.info("Token refreshed" + refreshed);
//           else {
//             Vue.$log.warn(`Token not refreshed, valid for
//          ${Math.round(
//            keycloak.tokenParsed.exp +
//              keycloak.timeSkew -
//              new Date().getTime() / 1000
//          )} seconds`);
//           }
//         })
//         .catch(() => Vue.$log.error("Failed to refresh token"));
//     }, 6000);
//   })
//   .catch(() => {
//     Vue.$log.error("Authenticated Failed");
//   });
