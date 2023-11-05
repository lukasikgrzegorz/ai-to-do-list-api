const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../auth/userAuth");

router.get("/", auth, tasksController.getTasks);

router.get("/:id", auth, tasksController.getTaskById);

router.delete("/:id", auth, tasksController.removeTask);

router.post("/", auth, tasksController.createTask);

router.put("/:id", auth, (req, res, next) => {
  tasksController.updateTask(req, res, next);
});

module.exports = router;
