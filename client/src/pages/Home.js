import React from 'react';
import TaskList from '../components/tasks/TaskList';
import AddTask from '../components/tasks/AddTask';

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