import { useState, useEffect, useCallback } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  getStats,
} from "../api/task.api";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 8 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const res = await getTasks(params);
      setTasks(res.data.data.tasks);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [tasks]);

  const handleFormSubmit = async (data) => {
    try {
      if (editTask) {
        await updateTask(editTask._id, data);
      } else {
        await createTask(data);
      }
      setFormOpen(false);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setFormOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter((prev) => (prev === value ? "" : value));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <StatsBar stats={stats} />

        <div className="flex items-center gap-3 flex-wrap">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearchChange}
            className="max-w-xs"
          />
          <Button
            size="sm"
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => handleStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            size="sm"
            variant={statusFilter === "completed" ? "default" : "outline"}
            onClick={() => handleStatusFilter("completed")}
          >
            Completed
          </Button>
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => {
              setEditTask(null);
              setFormOpen(true);
            }}
          >
            + Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};
