const Task = require("../models/tasksModel");

const listTasks = async ({ filters, skip, limit }) => {
  try {
    const tasks = await Task.find({ ...filters }, null, { skip, limit });
    return tasks;
  } catch (error) {
    return false;
  }
};

const getTaskById = async ({ userId, taskId }) => {
  try {
    return Task.findOne({ _id: taskId, owner: userId });
  } catch (error) {
    return false;
  }
};

const countTasks = async (filters) => {
  try {
    const count = await Task.countDocuments(filters);
    return count;
  } catch (error) {
    throw new Error(`Error counting tasks: ${error.message}`);
  }
};

const removeTask = async ({ userId, taskId }) => {
  try {
    return Task.findByIdAndRemove({ _id: taskId, owner: userId });
  } catch (error) {
    return false;
  }
};

const addTask = async (body) => {
  try {
    Task.create(body);
  } catch (error) {
    return false;
  }
};

const updateTask = async ({ userId, taskId, body }) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, owner: userId },
      { $set: { title: body.title, date: body.date, isDone: body.isDone } },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    return false;
  }
};

module.exports = {
  listTasks,
  countTasks,
  getTaskById,
  removeTask,
  addTask,
  updateTask,
};
