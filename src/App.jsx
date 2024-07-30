import React, { useState } from "react";
import Column from "./components/Column";
import Modal from "./components/Modal";
import "./styles/global.css";
import "./styles/App.css";

const initialColumns = {
  resources: [],
  todo: [],
  doing: [],
  done: [],
};

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedItem, setDraggedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  const addTask = (columnName, taskName, taskDescription, imageDataUrl) => {
    const newTask = {
      id: Date.now(),
      title: taskName,
      description: taskDescription,
      imageUrl: imageDataUrl,
      isOpen: false,
    };
    setColumns({
      ...columns,
      [columnName]: [...columns[columnName], newTask],
    });
  };

  const openModal = (columnName) => {
    setActiveColumn(columnName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveColumn(null);
  };

  const toggleTask = (columnName, taskId) => {
    setColumns({
      ...columns,
      [columnName]: columns[columnName].map((task) =>
        task.id === taskId ? { ...task, isOpen: !task.isOpen } : task
      ),
    });
  };

  const onDragStart = (columnName, task) => {
    setDraggedItem({ task, sourceColumn: columnName });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (targetColumn) => {
    if (draggedItem && draggedItem.sourceColumn !== targetColumn) {
      setColumns({
        ...columns,
        [draggedItem.sourceColumn]: columns[draggedItem.sourceColumn].filter(
          (task) => task.id !== draggedItem.task.id
        ),
        [targetColumn]: [...columns[targetColumn], draggedItem.task],
      });
    }
    setDraggedItem(null);
  };

  return (
    <div className="app-container">
      {Object.entries(columns).map(([columnName, tasks]) => (
        <Column
          key={columnName}
          name={columnName}
          tasks={tasks}
          onAddTask={() => openModal(columnName)}
          onToggleTask={(taskId) => toggleTask(columnName, taskId)}
          onDragStart={(task) => onDragStart(columnName, task)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(columnName)}
        />
      ))}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={addTask}
        columnName={activeColumn}
      />
    </div>
  );
}

export default App;
