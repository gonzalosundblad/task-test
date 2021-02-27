import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/main.module.css'
// import { tasks } from './api/tasks/_tasks'
const axios = require('axios');

export default function Home() {
  
const [id, setID] = useState(4);
const [tasks, setTasks] = useState([]);
const [edit, setEdit] = useState(false);
const [newTask, setNewTask] = useState({id: null, title: '', complete: null, color: ''});


function getRandomColor(){
  let colorValues = ["red", "blue", "green", "yellow"];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
}


useEffect(async () => {
  const resp = await axios.get('http://localhost:3000/api/tasks/list/any')
  setTasks(resp.data)
}, [])


async function handleDelete(todoTask) {
  console.log(todoTask)
  try{
    const request = await axios.get(`http://localhost:3000/api/tasks/delete/${todoTask.id}`);
    console.log(request.data[0].id)
    var filteredTasks = tasks.filter(t => t.id !== request.data[0].id);
    console.log(request.data, filteredTasks)
    setTasks(filteredTasks);
  }
  catch{
    var updatedTasks = tasks.filter(t => t.id !== todoTask.id)
    setTasks(updatedTasks)
    console.log('error in request')
  }
}

function handleComplete(todoTask) {
  var upTasks = [...tasks];
  upTasks[todoTask.id-1].complete = !upTasks[todoTask.id-1].complete
  setTasks(upTasks)
}


async function handleEdit(e) {
  e.preventDefault();
  setEdit(true);
}


function handleChange(e) {
  e.preventDefault();
  setNewTask(e.target.value)
}

function handleSubmit(e) {
  e.preventDefault();
  setTasks([
    ...tasks,
    {id: id, title: newTask, complete: false, color: getRandomColor()}
  ])
  setID(id + 1);
  mainInput.value = ''
  setNewTask('')
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS - Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.box}>
        <p>ToDo List</p>
        
        { edit && 
        <h1>edittt</h1>

        }
        { !edit &&
        <ul>
          {tasks.map((t, i) => 
            <li>
              <span className={styles.id}>
                {i + 1}.
              </span>
              <span  style={{ color: t.color }} onClick={handleEdit} className={styles.task}>{t.title}</span>
              
              <span className={styles.complete}><button  style={t.complete? { background: 'green' } : {background: 'gray'}} onClick={(e) => {
                                  e.preventDefault()
                                  handleComplete(t)
                              }}>✓</button> </span>
              
              <span className={styles.remove}><button onClick={(e) => {
                                  e.preventDefault()
                                  handleDelete(t)
                              }}>x</button></span>

            </li>)}
        </ul>
        }
        <form>

        <input id='mainInput' type='text' onChange={handleChange}/>
        <button onClick={handleSubmit}>Add task</button>
        </form>
        </div>
      </main>
    </div>
  )
}
