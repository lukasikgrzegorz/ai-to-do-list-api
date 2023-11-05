const tasksService = require("../services/tasksService");
const taskSchema = require("../schemas/tasksSchema");

const getTasks = async (req, res, next) => {
  const { page = 1, limit = 10, isDone } = req.query; 
  const skip = (page - 1) * limit;
  const owner = req.user._id;

  try {
    let tasks;

    if (isDone !== undefined) {
      tasks = await tasksService.updateTasksIsDone({ owner, isDone });
    } else {
      const totalTasks = await tasksService.countTasks({ owner });
      tasks = await tasksService.listTasks({
        filters: { owner, isDone: false }, 
        skip,
        limit,
        sortByDate: true,
        sortByCreationDate: true,
      });

      res.json({
        status: "success",
        code: 200,
        data: { tasks, totalTasks },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasksService.getTaskById({
      userId: req.user._id,
      taskId: id,
    });

    if (task) {
      res.json({
        status: "success",
        code: 200,
        data: { task },
      });
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await tasksService.removeTask({
      userId: req.user._id,
      taskId: id,
    });

    if (isDeleted) {
      res.json({
        status: "deleted",
        code: 200,
      });
    } else {
      res.status(404).json({
        message: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const body = req.body;

    console.log(body);
    const check = taskSchema.validate(body);

    if (check.error) {
      return res.status(400).json({
        message: check.error.details[0].message,
        code: 400,
      });
    }

    const taskData = { ...body };
    taskData.owner = owner;

    await tasksService.addTask(taskData);

    res.json({
      status: "created",
      code: 201,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const check = taskSchema.validate(body);

    if (check.error) {
      return res.status(400).json({
        message: check.error.details[0].message,
        code: 400,
      });
    }

    const newTask = JSON.parse(JSON.stringify(check.value));
    const task = await tasksService.updateTask({
      userId: req.user._id,
      taskId: id,
      body: newTask,
    });

    if (task) {
      res.json({
        status: "updated",
        code: 200,
        data: { task },
      });
      return;
    }

    res.status(404).json({
      status: "Not found",
      code: 404,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  removeTask,
  createTask,
  updateTask,
};
