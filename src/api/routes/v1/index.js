const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const categoryRouter = require("./category.route");
const branchRouter = require("./branch.route");
const bookRouter = require("./book.route");
const bookItemRouter = require("./bookItem.route");
const studentRouter = require("./student.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRouter);
router.use("/branches", branchRouter);
router.use("/books", bookRouter);
router.use("/bookItems", bookItemRouter);
router.use("/students", studentRouter);

module.exports = router;
