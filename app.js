const express = require('express');
const app = express();
const { login } = require('./db/connect');
const routeUsers = require("./route/User");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/v2", routeUsers);

login("mongodb://127.0.0.1:27017/", (error) => {
    if (error) {
        console.log("Erreur lors de la connexion avec la base de données!")
        process.exit(-1);
     } else {
        console.log("Connexion avec la base de données etablie!");
        app.listen(3000);
        console.log("Attente de requête au port 3000");
     }
})