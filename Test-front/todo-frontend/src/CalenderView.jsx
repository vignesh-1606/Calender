import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderView.css';
import axios from 'axios';


const formatDateToUTC = (date) => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString().split('T')[0];
};

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  console.log("Tasks:", tasks);


  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/viewtask")
      .then(response => setTasks(response.data.data))
      .catch(error => console.log(error));
  }, []);

  
  const getTasksForDate = (selectedDate) => {
    const selectedDateStr = formatDateToUTC(selectedDate); 
    console.log("Selected Date:", selectedDateStr);
    return tasks?.filter(task => task.duedate === selectedDateStr);
  };


  const tileContent = ({ date, view }) => {
    const tasksForDate = getTasksForDate(date);
    return tasksForDate?.length > 0 ? (
      <div className="task-status-badge">
        {tasksForDate.map((task, index) => (
          <div key={index} className={`task-status ${task.status.toLowerCase()}`}>
            {task.status === "PENDING" ? 'P' : task.status === "COMPLETED" ? 'C' : task.status === "IN_PROGRESS" ? 'IP' : ''}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className='whole1'>
    <div className="calendar-view-container">
      <h2 className='cal-date'>Task Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent} 
      />
    </div>
    </div>
  );
};

export default CalendarView;
