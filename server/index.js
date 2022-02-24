var express = require('express');
var cors = require("cors")
var app = express();

const keycloak = require('./config/keycloak-config.js').initKeycloak();
var testController = require('./controller/test-controller.js');

app.use(cors({
   origin: "http://localhost:3001"
}));
app.use(keycloak.middleware());
app.use('/test', testController);

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.listen(3000);