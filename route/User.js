const express = require('express');
const { createUser, editUser, deleteUser, getAllUsers } = require('../controller/User');
const router = express.Router();

router.route("/users").post(createUser);
router.route("/users").get(getAllUsers);
router.route("/users/:id").put(editUser);
router.route("/users/:id").delete(deleteUser);

module.exports = router;