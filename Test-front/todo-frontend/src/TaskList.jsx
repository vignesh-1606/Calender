// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import './TaskList.css';  // Import CSS file for styling

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   console.log(tasks);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/viewtask")
//       .then(response => setTasks(response.data.data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://127.0.0.1:8000/deletetask/${id}/`)
//       .then((response) => {
//         console.log(response)
//         const filter = tasks.filter((item) => {
//           return item.id !== id;
//         });
//         setTasks(filter);
//         toast.success('Task Deleted');
//       })
//       .catch(error => console.log(error));
//   }

//   return (
//     <div className="task-list-container">
//       <Toaster />
//       <h2 className="task-list-title">Task List</h2>
//       <div className="row">
//         <div className="col-lg-3">Completed</div>
//         <div className="col-lg-3">Incompleted</div>
//       </div>
//       <div className="task-cards">
//         {tasks?.map(task => (
//           <div key={task.id} className="task-card">
//             <div className="task-card-header">
//               <h3 className="task-title">{task.title}</h3>
//               <span className={`task-status ${task.status.toLowerCase()}`}>{task.status}</span>
//             </div>
//             <div className="task-card-body">
//               <p className="task-description">{task.description}</p>
//               <p className="task-duedate">Due Date: {task.duedate}</p>
//             </div>
//             <div className="task-card-footer">
//               <button className="task-button edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
//               <button className="task-button delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const handleEdit = (id) => {
//   // Redirect to task edit form
// };

// export default TaskList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import './TaskList.css';  // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');  

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/viewtask")
      .then(response => setTasks(response.data.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/deletetask/${id}/`)
      .then((response) => {
        const filter = tasks.filter((item) => item.id !== id);
        setTasks(filter);
        toast.success('Task Deleted');
      })
      .catch(error => console.log(error));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'completed') return task.status === 'COMPLETED';
    if (activeTab === 'incompleted') return task.status === 'IN_PROGRESS';
    if (activeTab === 'pending') return task.status === 'PENDING';
    return true;  
  });

const handleEdit = (id) => {
  navigate(`/taskedit/${id}`)
};

  return (
    <div className="task-list-container">
      <Toaster />
      <h2 className="task-list-title">Task List</h2>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button
          className={`tab-button ${activeTab === 'incompleted' ? 'active' : ''}`}
          onClick={() => setActiveTab('incompleted')}
        >
          Incompleted
        </button>
        <button
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
      </div>

      {/* Task Cards */}
      <div className="task-cards">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-card-header">
              <h3 className="task-title">{task.title}</h3>
              <span className={`task-status ${task.status.toLowerCase()}`}>{task.status}</span>
            </div>
            <div className="task-card-body">
              <p className="task-description">{task.description}</p>
              <p className="task-duedate">Due Date: {task.duedate}</p>
            </div>
            <div className="task-card-footer">
              <button className="task-button edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
              <button className="task-button delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TaskList;
