const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
// router.get("/", async (req, res) => {
// 	await Todo.find({ status: "active" }, (err, todos) => {
// 		if (err) {
// 			res.status(500).json({ error: "There was a server side error!" });
// 		} else {
// 			res.status(200).json({
// 				result: todos,
// 				message: "success!",
// 			});
// 		}
// 	});
// });

// get all todos & selected are not visible
router.get("/", async (req, res) => {
	await Todo.find({ status: "active" })
		.select({
			_id: 0,
			_v: 0,
			date: 0,
		})
		.limit(5)
		.exec((err, todos) => {
			if (err) {
				res.status(500).json({ error: "There was a server side error!" });
			} else {
				res.status(200).json({
					result: todos,
					message: "success",
				});
			}
		});
});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post a todo
router.post("/", async (req, res) => {
	const newTodo = new Todo(req.body);
	await newTodo.save((err) => {
		if (err) {
			res.status(500).json({ error: "There was a server side error!" });
		} else {
			res.status(200).json({
				message: "todo was inserted successfully!",
			});
		}
	});
});

// post multiple todo
router.post("/all", async (req, res) => {
	await Todo.insertMany(req.body, (err) => {
		if (err) {
			res.status(500).json({ error: "There was a server side error!" });
		} else {
			res.status(200).json({
				message: "todo was inserted successfully!",
			});
		}
	});
});

// update todo by id
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	await Todo.updateOne({ _id: id }, { $set: { status: "active" } }, (err) => {
		if (err) {
			res.status("500").json({ error: "There was a server side error!" });
		} else {
			res.status(200).json({ message: "Todo update successfully!" });
		}
	});
});

// delete a todo by id
router.delete("/:id", async (req, res) => {
	await Todo.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			res.status("500").json({ error: "There was a server side error!" });
		} else {
			res.status(200).json({ message: "Todo delete successfully!" });
		}
	});
});

module.exports = router;
