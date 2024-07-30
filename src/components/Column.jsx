import React from "react";
import Task from "./Task";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/Column.css";

const Column = ({
  name,
  tasks,
  onAddTask,
  onToggleTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => (
  <motion.div
    className="column-container"
    onDragOver={onDragOver}
    onDrop={onDrop}
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
    <motion.button
      className="button"
      onClick={onAddTask}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <FaPlus /> Add Task
    </motion.button>
    {tasks.map((task) => (
      <motion.div
        key={task.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Task
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDragStart={() => onDragStart(task)}
        />
      </motion.div>
    ))}
  </motion.div>
);

export default Column;
