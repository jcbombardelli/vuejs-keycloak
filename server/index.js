const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
        headers: ["Authorization"], // an array of strings - 'Access-Control-Allow-Headers'
        exposedHeaders: ["Accept"], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ["Accept"], // an array of additional exposed headers
        maxAge: 60,
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
    },
  });

  //Keycloak

  await server.register({
    plugin: require('yar'),
    options: {
        storeBlank: false,
        name: 'kc_session',
        maxCookieSize: 0,
        cookieOptions: {
            password: 'the-password-must-be-at-least-32-characters-long',
            isSecure: false // use true for production (https).
        }
    }
});

  await server.register({
    plugin: require('keycloak-hapi/src/index'),
    options: {
        serverUrl: 'http://localhost:8888/auth',
        realm: 'star-realm',
        clientId: 'star-hapi',
        clientSecret: '6a9defd4-d49b-47d6-b224-9fc559de8090',
        bearerOnly: true
    }
});

  server.auth.strategy("keycloak", "keycloak");
  server.auth.default("keycloak");

  server.route({
    method: ["GET"],
    path: "/",
    handler: (request, h) => {
      console.log(request.auth)
      return h.response({ obj: request.auth }).code(200);
    },
  });

  await server.start();
};

init();
