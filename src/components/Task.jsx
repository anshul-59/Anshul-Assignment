import React from "react";
import { FaArrowsAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Task.css";

const Task = ({ task, onToggle, onDragStart }) => (
  <motion.div
    className={`task-card ${task.isOpen ? "open" : ""}`}
    draggable
    onDragStart={onDragStart}
    onClick={onToggle}
    // Animating the border color change
    initial={{ borderColor: "#ddd" }}
    animate={{ borderColor: task.isOpen ? "#007bff" : "#ddd" }}
    transition={{ duration: 0.3 }}
  >
    <h3>
      {task.title} <FaArrowsAlt />
    </h3>
    <AnimatePresence>
      {task.isOpen && (
        <motion.div
          className="task-content"
          // Animating the opacity and height for dropdown effect
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{task.description}</p>
          {task.imageUrl && (
            <motion.img
              className="task-image"
              src={task.imageUrl}
              alt={task.title}
              // Animating the image visibility
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Task;
