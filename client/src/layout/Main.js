import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import axios from 'axios';

const Main = () => {
    const [task, setTask] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:7000/api/tasks")
            .then(response => {
                setTask(response.data);
                setLoaded(true);
            })
        //disable-eslint-next-line
    }, []);

    return (
        <div>
            {loaded && <TaskList task={task} />}
        </div>
    )
}

export default Main;
