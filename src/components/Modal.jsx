import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, onSubmit, columnName }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubmit(columnName, taskName, taskDescription, reader.result);
        resetForm();
      };
      reader.readAsDataURL(imageFile);
    } else {
      onSubmit(columnName, taskName, taskDescription, null);
      resetForm();
    }
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setImageFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Add New Task to {columnName}</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
              <textarea
                className="textarea"
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
              <label className="file-input-label">
                {imageFile ? "Image selected" : "Choose Image"}
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <div className="modal-buttons">
                <button className="button" type="submit">
                  Add Task
                </button>
                <button className="button" type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
