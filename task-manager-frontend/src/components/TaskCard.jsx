import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between border rounded-lg p-4 bg-white gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className={`font-medium text-sm ${task.status === "completed" ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </p>
          <Badge
            variant={task.status === "completed" ? "secondary" : "outline"}
          >
            {task.status}
          </Badge>
        </div>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1 truncate">
            {task.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button size="sm" variant="outline" onClick={() => onToggle(task._id)}>
          {task.status === "pending" ? "Complete" : "Undo"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
