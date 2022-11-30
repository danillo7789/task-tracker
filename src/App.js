import React from 'react';
import { useState, useEffect } from "react";
import Tasks from './components/Tasks';
import Header from './components/Header';
import AddTask from './components/AddTask';


const App = () => {
  const [tasks, setTasks] = useState([]);
  //useEffect to get tasks from db json server on page load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  //fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    //data is the new gotten task
    return data
  }

  //fetch single Task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }


  const [showAddTask, setShowAddTask] = useState(false);


  //to add task to server
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await response.json()
    setTasks([...tasks, data])

    //TO ADD TASK JUST TO DOM
    // const id = Math.floor(Math.random() * 1000) + 1
    // //newtask added equals new text, day and reminder, + newly generated id
    // const newTask = {...task, id}
    // setTasks([...tasks, newTask])
  }

  //to actually delete the tasks from the server
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    //filter is a high order array method
    //filter will sieve the tasks, then will return each task whose id are not equal to the id clicked
    setTasks(tasks.filter((task) => task.id !== id))
    console.log('deleteTask')
  };


  //doubleclick to set reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    //this seems not to do anything
    const data = await res.json()
    //i added this myself just to use the 'data' variable
    tasks.reminder = data.reminder
   

    //this was the code my tutor wrote but didn't allow my doubleclick function work, and i don't know why
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !data.reminder } : task));

    //so i tweaked it and it works fine in my db-json server
    setTasks(tasks.map((task) => (task.id === id ? { ...task = updTask } : task)));
    console.log(tasks)
    
  }

  let clickCount = 0
  const handleClick = (id) => {
    clickCount++
    if (clickCount === 1) {
      setTimeout(() => { clickCount = 0 }, 400)
    }
    else if (clickCount === 2) {
      toggleReminder(id)
      console.log(clickCount)
    }
  }


  //the && is a short way of doing tenary operators without using the else
  return (
    <div className='App'>
      <Header showTasks={() => setShowAddTask(!showAddTask)} toggleBtn={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks
        onDelete={deleteTask}
        doubleClick={handleClick}
        tasks={tasks} /> : 'No Tasks to Show'}
    </div>
  );
};

export default App;
