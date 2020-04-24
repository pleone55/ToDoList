import React from 'react';
import AddTask from './components/AddTask';
import Navbar from './layout/Navbar';
import Main from './layout/Main';

import TaskState from './context/task/TaskState';

function App() {
  return (
    <TaskState>
      <Navbar />
      <Main/>
      <AddTask />
    </TaskState>
  );
}

export default App;
