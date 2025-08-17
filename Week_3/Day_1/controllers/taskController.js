let tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Hello", completed: false },
];
let nextId = 4;

function getAllTasks(req, res, next) {
  try {
    let results = tasks;

    res.status(200).json({
      success: true,
      data: results,
      message: "Tasks Retrieved Successfully",
    });
  } catch (err) {
    next(err);
  }
}
function getTask(req, res, next) {
  try {
    const { title } = req.query;
    let result = tasks;
    if (title) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Task retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
}

function getTaskById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    let task = tasks.find((t) => t.id === id);
    if (!task) {
      {
        res.status(404).json({
          success: false,
          data: null,
          message: "Task Not Found",
        });
      }
    }
    res.status(200).json({
      success: true,
      data: task,
      message: "Task Retrieved Successfully",
    });
  } catch (err) {
    next(err);
  }
}

function createTask(req, res, next) {
  try {
    const { title, completed = false } = req.body;
    const newTask = {
      id: nextId++,
      title,
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (err) {
    next(err);
  }
}

function updateTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;
    let index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Task Not Exist",
      });
    }
    if (title !== undefined) {
      tasks[index].title = title;
    }
    if (completed !== undefined) {
      tasks[index].completed = completed;
    }
    res.json({
      success: true,
      data: tasks[index],
      message: "Task Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }

    const deleted = tasks.splice(index, 1)[0];
    res.status(200).json({
      success: true,
      data: deleted,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

function getStats(req, res, next) {
  try {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

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
