import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Todo from './Pages/Todo/Todo';
import SideDrawer from './Pages/components/Drawer';
import Login from './Pages/Login/Login';
function App() {
  return (
    <div className='App'>
      <SideDrawer/>
      <div style={{width:"100%"}}>
      <Routes>
        <Route path='/' element={<Todo/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </div>

    </div>
  );
}

export default App;
