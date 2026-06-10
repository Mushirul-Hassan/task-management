import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

const TaskForm = ({ open, onClose, onSubmit, editTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (editTask) {
      reset({ title: editTask.title, description: editTask.description });
    } else {
      reset({ title: "", description: "" });
    }
  }, [editTask, open, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };
};
