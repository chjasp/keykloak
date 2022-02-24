var session = require("express-session");
var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  "realm": "dq-radar",
  "bearer-only": true,
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "resource": "dq-radar-backend",
  "verify-token-audience": true,
  "credentials": {
    "secret": "4fb3b0b8-d53a-458c-b839-e7782511340f"
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "policy-enforcer": {}
}

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak(
      { store: memoryStore, resave: false, saveUninitialized: true },
      keycloakConfig
    );
    console.log(_keycloak);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
