<template>
  <div id="app" class="container">
    <header>
      <h1>Keycloak OAuth2 Login</h1>
    </header>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="token"></HelloWorld>
    <Greet text="Username" :username="username" />
    <Greet text="Email" :username="email" />
    <Greet text="Id" :username="sub" />
    <br />
    <div
      class="container form"
      style="display: flex; flex-direction: column; justify-content: space-between; height: 100px; align-items: center;"
    >
      <input v-model="username" placeholder="username" />
      <input v-model="password" placeholder="password" type="password" />
      <button @click="login">Autenticar</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Greet from "./components/Greeting.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Greet,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      username: "jcbombardelli",
      password: "123456",
      sub: "",
      email: "",
    };
  },
  methods: {
    async login() {
      const request = {
        client_id: process.env.VUE_APP_KEYCLOAK_CLIENT,
        username: this.username,
        password: this.password,
        grant_type: "password",
      };

      const baseUrl = `http://localhost:8888/auth/realms/${process.env.VUE_APP_KEYCLOAK_REALM}`;
      const openidUrl = `${baseUrl}/protocol/openid-connect`;
      let formBody = [];
      for (const property in request) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(request[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
      formBody = formBody.join("&");

      fetch(`${openidUrl}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: formBody,
      })
        .then((fetched) => fetched.json())
        .then((r) => {
          this.token = JSON.stringify(r);
          localStorage.setItem("token", r.access_token);
          const { sub, preferred_username, email } = this.decodeToken(
            r.access_token
          );
          this.username = preferred_username;
          this.email = email;
          this.sub = sub;

          fetch(`http://localhost:8080/`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${r.access_token}`,
            },
          })
            .then((fetched) => fetched.json())
            .then((r) => {
              if(r.statusCode === 401){
                this.token = r
                localStorage.setItem('token', r)
              }
              this.token = JSON.stringify(r.header).replace('"', '');
              localStorage.setItem("token", r.header);
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch((error) => localStorage.setItem("token", error));
    },
    decodeToken(token) {
      if (token) {
        const base64 = token
          .split(".")[1]
          .replace("-", "+")
          .replace("_", "/");
        return JSON.parse(Buffer.from(base64, "base64").toString("binary"));
      }
      return undefined;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
