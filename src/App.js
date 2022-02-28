import { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskRow } from './components/TaskRow';
import { TaskCreator } from './components/TaskCreator';
import VisibilityControl from "./components/VisibilityControl";

function App() {

  // Definir el propietario de las tareas y las mismas tares
  const [userName, setUserName] = useState('Leo');

  const [taskItems, setTaskItems] = useState([
    { name: 'Task One', done: true },
    { name: 'Task Two', done: false },
    { name: 'Task Three', done: true },
    { name: 'Task Four', done: false }
  ])

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if(data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName('Leo Example')
      setTaskItems([
        { name: 'Example One', done: true },
        { name: 'Example Two', done: false },
        { name: 'Example Three', done: true },
        { name: 'Example Four', done: false }
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const toggleTask = task => {
    setTaskItems(taskItems.map(t => ( t.name === task.name ? {...t, done: !t.done} : t )))
  }

  const taskTableRows = (doneValue) =>
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
    <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
  ))

  const addTask = taskName => {
    if(!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  return (
    <>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={addTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description='Completed Tasks'
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </>
  );
}

export default App;
