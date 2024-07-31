import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({ title: '', date: '', time: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', date: '', time: '' });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const addTask = () => {
    if (newTask.title && newTask.date && newTask.time) {
      setTasks([...tasks, newTask]);
      setNewTask({ title: '', date: '', time: '' });
    }
  };

  const updateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editTask;
    setTasks(updatedTasks);
    setShowEditPopup(false);
    setEditIndex(null);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (filter) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'az':
        return a.title.localeCompare(b.title);
      case 'za':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div className="filter-buttons">
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
            ALL
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <button onClick={() => { setFilter('date'); setShowDropdown(false); }}>Sort by Date</button>
              <button onClick={() => { setFilter('az'); setShowDropdown(false); }}>Sort A-Z</button>
              <button onClick={() => { setFilter('za'); setShowDropdown(false); }}>Sort Z-A</button>
            </div>
          )}
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
        />
        <button className="add-task-btn" onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {sortedTasks.map((task, index) => (
          <div className="task" key={index}>
            <span className="task-text">{task.title} - {task.date} {task.time}</span>
            <button className="edit-btn" onClick={() => { setEditTask(task); setEditIndex(index); setShowEditPopup(true); }}>Edit</button>
            <button className="delete-btn" onClick={() => setDeleteIndex(index)}>Delete</button>
          </div>
        ))}
      </div>

      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              placeholder="Task Title"
            />
            <input
              type="date"
              value={editTask.date}
              onChange={(e) => setEditTask({ ...editTask, date: e.target.value })}
            />
            <input
              type="time"
              value={editTask.time}
              onChange={(e) => setEditTask({ ...editTask, time: e.target.value })}
            />
            <button className="save-btn" onClick={updateTask}>Save</button>
            <button className="cancel-btn" onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {deleteIndex !== null && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <button className="delete-btn" onClick={deleteTask}>Yes</button>
            <button className="cancel-btn" onClick={() => setDeleteIndex(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
