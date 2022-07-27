const {MongoClient, Db } = require("mongodb")

let client = null;

const login = (url, callback) => {
   
    if (client == null) {

        client = new MongoClient(url)
        
        client.connect((error) => {
            if (error) {
                client = null;
            } else {
                callback();
            }
        })
    } else {
        callback();
    }

}

const db = () => {
    return new Db(client, "CrudApi")
}

const closeConnection = () => {
    if (client) {
        client.close();
        client = null;
    }
}

module.exports = {login, db, closeConnection}

