import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask, getStats } from "../api/task.api";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
}