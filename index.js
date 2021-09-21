const express = require("express");
const mongoose = require("mongoose");

// app initialization
const app = express();
app.use(express.json());
const port = 3000;

// database connection with mongoose
mongoose
	.connect("mongodb://localhost/todos", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Mongoose connected"))
	.catch((err) => console.log(err));

// application routes

// default error handler
function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({ error: err });
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
