const Todo = require("../models/Todo");

module.exports.getList = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var limit = 8;
  // var start = (page - 1) * limit;
  // var end = page * limit;
  // await Todo.find().slice(start, end);
  const seletor = req.query.status
    ? { status: req.query.status, user_id: req.user._id }
    : { user_id: req.user._id };
  try {
    if (req.query.textSearch) {
      var todos = await Todo.find({
        user_id: req.user._id,
        $or: [{ title: new RegExp(req.query.textSearch, "i") }]
      })
        .sort({ _id: -1 })
        .select("_id title status");
    } else {
      var todos = await Todo.find(seletor)
        .sort({ _id: -1 })
        .select("_id title status");
    }

    // const todos = await Todo.find({
    //   $or: [
    //     { $text: { $search: req.query.textSearch } },
    //     { title: new RegExp(req.query.textSearch, "i") }
    //   ]
    // }).select("_id title status");
    res.status(201).json({
      status: 200,
      message: "get list todo success",
      data: todos,
      total: todos.length
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.create = async (req, res) => {
  const todo = new Todo({
    user_id: req.user._id,
    title: req.body.title
  });
  try {
    await todo.save();
    res.status(201).json({ status: 200, message: "Add todo success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.find = async (req, res) => {
  try {
    const findTodo = await Todo.findOne({
      _id: req.params.id,
      user_id: req.user._id
    }).select("_id title status");
    if (findTodo)
      res.status(201).json({
        status: 200,
        message: "get todo by id success",
        data: findTodo
      });
    else res.status(400).json({ message: "Action does exist" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.update = async (req, res) => {
  try {
    const findTodo = await Todo.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    if (findTodo) {
      const updateTodo = await Todo.updateOne(
        { _id: req.params.id },
        { $set: { status: req.body.status } }
      );
      res.status(201).json({
        status: 200,
        message: "update todo success",
        data: updateTodo._id
      });
    } else {
      res.status(400).json({ message: "Action does exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const findTodo = await Todo.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    if (findTodo) {
      await Todo.remove({ _id: req.params.id });
      res.status(201).json({
        status: 200,
        message: "Delete todo success"
      });
    } else {
      res.status(400).json({ message: "Action does exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.updateMany = async (req, res) => {
  try {
    const findTodo = await Todo.find({
      user_id: req.user._id
    });
    if (findTodo) {
      await Todo.updateMany(
        { user_id: req.user._id },
        {
          status: req.body.status
        }
      );
      res.status(201).json({
        status: 200,
        message: "Change status todos success"
      });
    } else
      res.status(201).json({ status: 200, message: "Does not exist todo" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.deleteComplele = async (req, res) => {
  try {
    const findTodo = await Todo.find({ user_id: req.user._id, status: true });
    if (findTodo.length > 0) {
      await Todo.deleteMany({ user_id: req.user._id, status: true });
      res
        .status(201)
        .json({ status: 200, message: "Delete todo complete success" });
    } else
      res
        .status(201)
        .json({ status: 200, message: "Does not exist todo complete" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
