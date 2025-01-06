import { BrowserRouter,Routes,Route } from 'react-router-dom';

import CalendarView from './CalenderView'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import Nav from './Nav';
import TaskEdit from './TaskEdit';


function App() {
  
  return (
    
     <BrowserRouter>
     <Nav/>

  <Routes>
    <Route path='/calenderview' element={<CalendarView/>}/>
    <Route path='/taskform' element={<TaskForm/>}/>
    <Route path='/tasklist' element={<TaskList/>}/>
    <Route path='/taskedit/:id' element={<TaskEdit/>}/>
    
    
  </Routes>
  </BrowserRouter>
    
    
  )
}

export default App
