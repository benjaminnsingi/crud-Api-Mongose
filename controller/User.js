const { User } = require("../model/User");
const client = require('../db/connect');

const createUser = async (request, response) => {
    try {
       let user = new User(
           request.body.lastname,
           request.body.email,
           request.body.job,
           request.body.age
       );
       let result = await client.db().collection("users").insertOne(user);

       response.status(200).json(result);

    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}

// Get all users in database
const getAllUsers = async (request, response) => {
    try {
        let cursor = client.db().collection("users").find();
        let result = await cursor.toArray();

        if (result.length > 0) {
            response.status(200).json(result);
        } else {
            response.status(204).json({message: "Aucun utilisateur trouvé!"})
        }

    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}

// Edit user in database

const editUser = async (request, response) => {
    try {
        let id = new ObjectID(request.params.id);
        let LastName = request.body.lastname;
        let Email = request.body.email;
        let Job = request.body.job;
        let Age = request.body.age;

        let result = await client.db().collection("users").updateOne({_id: id}, {$set: {lastname: LastName, email: Email, job: Job, age: Age}});
        response.status(200).json(result);

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "Modification réussie" });
          } else {
            res.status(404).json({ message: "Cet utilisateur n'existe pas" });
          }

    } catch (error) {
         console.log(error);
         response.status(500).json(error);
    }
}


// Delete user in database

const deleteUser = async (request, response) => {
    try {
        let id = new ObjectID(request.params.id);

        let result = await client.db().collection("users").deleteOne({_id: id});
        response.status(200).json(result);

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Suppression réussie" });
          } else {
            res.status(404).json({ message: "Cet utilisateur n'existe pas" });
          }

    } catch (error) {
         console.log(error);
         response.status(500).json(error);
    }
}

module.exports = {createUser, getAllUsers, editUser, deleteUser};