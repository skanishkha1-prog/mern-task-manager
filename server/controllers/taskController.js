const Task = require("../models/Task");

exports.createTask = async (req, res) => {

    try {

       const task = await Task.create({
    title: req.body.title,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    user: req.user.id
});

        res.status(201).json(task);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json(tasks);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true }
        );

        res.json(task);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.deleteTask = async (req, res) => {

    try {

        await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        res.json({
            message: "Task Deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};