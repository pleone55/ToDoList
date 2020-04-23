import React from 'react';
import AddTask from './components/AddTask';
import Navbar from './components/layout/Navbar';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <Navbar />
      <TaskList />
      <AddTask />
    </>
  );
}

export default App;
