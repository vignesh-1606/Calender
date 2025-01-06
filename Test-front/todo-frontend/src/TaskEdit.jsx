import React, { useState, useEffect } from "react";
import axios from "axios";
import './TaskEdit.css';  // Import CSS file for styling
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
    const {id}=useParams()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [duedate, setDueDate] = useState("");
const navigate =useNavigate()
  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/task/${id}`)
        .then(response => {
            console.log(response);
          const taskData = response?.data?.data;
          setTitle(taskData?.title);
          setDescription(taskData?.description);
          setStatus(taskData?.status);
          setDueDate(taskData?.duedate);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  const handleSubmit = async(e) => {
   try {
    e.preventDefault();
    const newTask = { title, description, status, duedate };
    console.log(newTask);
   
      await axios.put(`http://127.0.0.1:8000/updatetask/${id}/`, newTask)
      .then(response => {
        console.log("response===>", response);
        toast.success('Task updated successfully' );
navigate('/tasklist')
      })
      .catch(error => {
        console.log("Error:", error);
        toast.error('Something went wrong');
      });
    
   } catch (error) {
    
   }
  };

  return (
    <div className="task-form-container">
      <Toaster />
      <h2 className="form-title">{id ? "Edit Task" : "Create New Task"}</h2>
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
          {id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;
