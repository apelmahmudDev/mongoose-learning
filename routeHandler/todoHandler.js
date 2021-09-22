const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// get all todos by async await
router.get("/", async (req, res) => {
	try {
		const data = await Todo.find({ status: "active" });
		res.status(200).json({
			result: data,
			message: "success!",
		});
	} catch (err) {
		res.status(500).json({ error: "There was a server side error!" });
	}
});

// get all todos & selected are not visible by callback
// router.get("/", (req, res) => {
// 	Todo.find({ status: "active" })
// 		.select({
// 			_id: 0,
// 			_v: 0,
// 			date: 0,
// 		})
// 		.limit(5)
// 		.exec((err, todos) => {
// 			if (err) {
// 				res.status(500).json({ error: "There was a server side error!" });
// 			} else {
// 				res.status(200).json({
// 					result: todos,
// 					message: "success",
// 				});
// 			}
// 		});
// });

// get a todo by id
router.get("/:id", async (req, res) => {});

// post a todo by async await
router.post("/", async (req, res) => {
	try {
		const newTodo = new Todo(req.body);
		await newTodo.save(); //insertOne()
		res.status(200).json({
			message: "todo was inserted successfully!",
		});
	} catch (err) {
		res.status(500).json({
			error: "There was a server side error!",
		});
	}
});

// post a todo by callback
// router.post("/", (req, res) => {
// 	const newTodo = new Todo(req.body);
// 	newTodo.save((err) => {
// 		if (err) {
// 			res.status(500).json({ error: "There was a server side error!" });
// 		} else {
// 			res.status(200).json({
// 				message: "todo was inserted successfully!",
// 			});
// 		}
// 	});
// });

// post multiple todo by async await
router.post("/all", async (req, res) => {
	try {
		await Todo.insertMany(req.body);
		res.status(200).json({
			message: "todo was inserted successfully!",
		});
	} catch (err) {
		res.status(500).json({
			error: "There was a server side error!",
		});
	}
});

// post multiple todo by callback
// router.post("/all", (req, res) => {
// 	Todo.insertMany(req.body, (err) => {
// 		if (err) {
// 			res.status(500).json({ error: "There was a server side error!" });
// 		} else {
// 			res.status(200).json({
// 				message: "todo was inserted successfully!",
// 			});
// 		}
// 	});
// });

// update todo by id with async await
router.put("/:id", async (req, res) => {
	try {
		await Todo.updateOne(
			{ _id: req.params.id },
			{ $set: { status: "active" } }
		);
		res.status(200).json({
			message: "Todo update successfully!",
		});
	} catch (err) {
		res.status("500").json({ error: "There was a server side error!" });
	}
});

// update todo by id with callback
// router.put("/:id",  (req, res) => {
// 	const id = req.params.id;
//  Todo.updateOne({ _id: id }, { $set: { status: "active" } }, (err) => {
// 		if (err) {
// 			res.status("500").json({ error: "There was a server side error!" });
// 		} else {
// 			res.status(200).json({ message: "Todo update successfully!" });
// 		}
// 	});
// });

// delete a todo by id with async await
router.delete("/:id", async (req, res) => {
	try {
		await Todo.deleteOne({ _id: req.params.id });
		res.status(200).json({
			message: "Todo delete successfully!",
		});
	} catch (error) {
		res.status("500").json({
			error: "There was a server side error!",
		});
	}
});

// delete a todo by id with callback
// router.delete("/:id", (req, res) => {
// 	Todo.deleteOne({ _id: req.params.id }, (err) => {
// 		if (err) {
// 			res.status("500").json({ error: "There was a server side error!" });
// 		} else {
// 			res.status(200).json({ message: "Todo delete successfully!" });
// 		}
// 	});
// });

module.exports = router;
