const Task = require("../models/Task");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = { userId: req.user._id };

    if (status && ["pending", "completed"].includes(status)) {
      filter.status = status;
    }

    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Task.countDocuments(filter),
    ]);

    return successResponse(res, 200, "Tasks fetched", {
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) return errorResponse(res, 404, "Task not found.");
    return successResponse(res, 200, "Task fetched", { task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      userId: req.user._id,
    });

    return successResponse(res, 201, "Task created successfully", { task });
  } catch (error) {
    next(error);
  }
};
