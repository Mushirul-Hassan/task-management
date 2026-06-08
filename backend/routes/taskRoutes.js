const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(protect);

const createRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

const updateRules = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed"),
];

router.get("/stats", getTaskStats);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createRules, validate, createTask);
router.put("/:id", updateRules, validate, updateTask);
router.patch("/:id/toggle", toggleTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;
