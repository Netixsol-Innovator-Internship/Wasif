const Task = require("../models/Task");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({ user: req.user });
    res.status(200).json({
      success: true,
      data: tasks,
      message: "Tasks retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function getTask(req, res, next) {
  try {
    const { title } = req.query;
    let query = { user: req.user };
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    const tasks = await Task.find(query);
    res.status(200).json({
      success: true,
      data: tasks,
      message: "Task(s) retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      data: task,
      message: "Task retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, completed = false } = req.body;
    const task = await Task.create({
      title,
      completed,
      user: req.user
    });
    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { title, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      data: task,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function getStats(req, res, next) {
  try {
    const total = await Task.countDocuments({ user: req.user });
    const completed = await Task.countDocuments({ user: req.user, completed: true });
    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending: total - completed,
      },
      message: "Stats retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
};
