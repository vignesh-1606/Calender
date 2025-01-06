import React, { useState } from "react";
import axios from "axios";
import './TaskForm.css'; // Import CSS file for styling
import toast, { Toaster } from 'react-hot-toast';
const TaskForm = ({ task = null }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : "PENDING");
  const [duedate, setDueDate] = useState(task ? task.duedate : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { title, description, status, duedate: duedate };
console.log(newTask);
 
  axios.post('http://127.0.0.1:8000/addtask', newTask).then((response) => {
    console.log("response===>", response);
    toast.success('Task added successfully')
    
   
  })
   };

  return (
    <div className="task-form-container">
      <Toaster/>
      <h2 className="form-title">{task ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title" className="label">Task Title</label>
          <input 
            id="title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="input" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="label">Description (optional)</label>
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="textarea" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="status" className="label">Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="select"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="label">Due Date</label>
          <input 
            id="dueDate" 
            type="date" 
            value={duedate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="input" 
            required 
          />
        </div>

        <button type="submit" className="submit-button">
          {task ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
