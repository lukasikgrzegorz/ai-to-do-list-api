const express = require("express");
const router = express.Router();
const passport = require("passport");
const tasksController = require("../controllers/tasksController");
const auth = require("../auth/userAuth");

router.get("/", auth, tasksController.getTasks);

router.get("/:id", auth, tasksController.getTaskById);

router.delete("/:id", auth, tasksController.removeTask);

const authenticateUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user && !err) {
      req.user = user; // Przypisanie danych użytkownika do req.user
    }
    next();
  })(req, res, next);
};

router.post("/", authenticateUser, tasksController.createTask);

router.put("/:id", auth, (req, res, next) => {
  tasksController.updateTask(req, res, next);
});

module.exports = router;
