import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

const Home = () => {
    return (
        <div>
            <div>
                <AddTask />
            </div>
            <div>
                <TaskList />
            </div>
        </div>
    );
};
export default Home;