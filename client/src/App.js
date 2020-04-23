import React from 'react';
import AddTask from './components/AddTask';
import Navbar from './components/layout/Navbar';
import Main from './layout/Main';

function App() {
  return (
    <>
      <Navbar />
      <Main/>
      <AddTask />
    </>
  );
}

export default App;
