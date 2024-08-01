import React from 'react'
import { useState } from 'react'
import {IoAdd, IoRadioButtonOn, IoRadioButtonOffSharp} from 'react-icons/io5'
import {FaStar, FaregStar, FaEdit, FaSave, FaRegStar} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TodoList.css';

function TodoList() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');

const addTask = () =>{
    if(newTask.trim() === ""){
        toast.error("Error Occured!",{
            position:toast.POSITION.TOP_RIGHT,
        });
        toast.warning("Cannot add Empty task",{
            position:toast.POSITION.TOP_RIGHT,
        });
    }
    if(newTask.trim() != ''){
        toast.success("Added Successfully",{
            position:toast.POSITION.TOP_RIGHT,
        });
        const newTaskData = {
            id:Date.now(),
            text:newTask,
            completed: false,
            isEditing: false,
        };

        setTasks((prevTasks) =>[newTaskData, ...prevTasks]);
        setNewTask('');
    }
}

const deleteTask = (taskId) => {
    toast.success("Deleted Successfully",{
        position:toast.POSITION.TOP_RIGHT,
    });

setTasks((prevTasks) =>{
    const updateTasks = prevTasks.filter((tasks) => taskId.id !== taskId);
    return updateTasks;
});
};

const toggleFavourite = (taskId) =>{
    toast.success("Added to Favourite Successfully",{
        position:toast.POSITION.TOP_RIGHT,
    });
    setTasks((prevTasks) => 
    prevTasks.map((task) =>{
        task.id === taskId? {...task, favorite: !task.favorite} : task
    })
    );
}

const markComplete = (taskId) =>{
    setTasks((prevTasks)=>
    prevTasks.map((tasks)=>
    tasks.id === taskId? {...tasks, completed: !tasks.completed} : tasks))
};

const handleEditTask = (taskId, newText) =>{
    toast.success("Updated Successfully",{
        position:toast.POSITION.TOP_RIGHT,
    });

setTasks((prevTasks) =>
    prevTasks.map((tasks)=>
    tasks.id === taskId? {...tasks, text:newText, isEditing:false}:tasks));
}

const handleToggleEditing = (taskId) =>{
    setTasks((prevTasks)=>
    prevTasks.map((tasks)=>
    tasks.id ===taskId? {...tasks,isEditing: !tasks.isEditing}:tasks));
};
const handleKeyPress = (e, taskId) =>{
    if(e.key === 'Enter'){
        handleEditTask(taskId, e.target.value);
    }
};

const renderTask = () =>{
    const completedTasks = tasks.filter((task)=>task.completed);
    const unCompletedTasks = tasks.filter((task) => !task.completed);

return[...unCompletedTasks, ...completedTasks].map((tasks)=>(
    <li key={tasks.id}
    className={`fade-in-animation border-yellow-300 border-2 w-[400px
    bg-[#fbf3bb] m-3 p-2 rounded-[8px] ${tasks.completed?'line-through decoraction-red-500' : ''}`}>
        <div className='flex'>
            <button onClick={() => markComplete(tasks.id)}>
                {
                    tasks.completed? <IoRadioButtonOn className='text-2xl text-[#435a4e]'/> :
                    <IoRadioButtonOffSharp className='text-2xl text-[#435a4e]'/>
                }
            </button>
            {
                tasks.isEditing?(
                    <div>
                        <input className='text-lg p-2 m-3 rounded-[8px] w-[250px] outline-none'
                        value={tasks.text}
                        onChange={(e)=> setTasks((prevTasks)=>
                        prevTasks.map((t) => (t.id === tasks.id ?{
                            ...t, text: e.target.value
                        }: t)))}
                        onKeyPress={(e) => handleKeyPress(e, tasks.id)}
                        />
                    </div>
                ):(
                    <div className='flex justify-between w-[100%]'>
                     <div>
                        <span className={`text-lg mt-2 ml-5 ${tasks.completed ? 'completed': ''}${tasks.isEditing ? 'contentEditable':''}`}
                        contentEditable = {tasks.isEditing}
                        onBlur={(e)=>handleEditTask(tasks.id, e.target.textContent)}>
                            {tasks.text}
                        </span>
                    </div> 
                      <div className='flex justify-end'>
                        <button className='m-2 mb-4'
                        onClick={() => toggleFavourite(tasks.id)}>
                          {tasks.favorite? <FaStar/>:<FaRegStar/>}  
                        </button>
                      </div>
                    </div>
                )
            }

        </div>
            <div className='flex justify-end'>
                {
                    tasks.isEditing ? (
                        <div>
                            <button className='m-2'
                            onClick={() => handleEditTask(tasks.id, tasks.text)}
                            >
                                <FaSave className='font-bold text-xl '/>
                            </button>
                        </div>
                    ):(
                        <div>
                            <button className='m-2'
                            onClick={() => deleteTask(tasks.id)}>
                                <AiOutlineDelete className='text-xl'/>
                            </button>
                            <button className='m-2'
                            onClick={() => handleToggleEditing(tasks.id)}>
                                <FaEdit className='text-xl'/>
                            </button>
                        </div>
                    )
                }
            </div>
    </li>
))
}

  return (
    <div className='todo-list'>
        <ToastContainer/>
        <h2 className='text-5xl font-semibold text-lime-950 m-3 flex justify-center'>Todo List</h2>
        <div className='shadow-[#435a4e] shadow-lg rounded-[8px] bg-white'>
            <div className='flex justify-center'>
                <input className='border-[2px] pl-5 w-[400px] mt-6 rounded-[8px] border-[#fbf3bb]'
                type='text'
                placeholder='Add new Task'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => (e.key ==='Enter' ? addTask():null)}/>
                <button className='flex bg-[#fbf3bb] m-2 mt-7 rounded-full p-3'
                onClick={addTask}>
                    <IoAdd/>
                </button>
            </div>
            <div className='flex justify-center h-[470px] w-[540px] scorllbar-hide overflow-y-scroll mt-5'>
                {tasks.length === 0?(<div className='flex justify-center item-center h-[400px]' >
                    <p className=' font-semibold text-2xl text-slate-500'>
                        You have No Tasks
                    </p>
                </div>):(
                    <ul>
                        {renderTask()}
                    </ul>
                )}

            </div>
        </div>
    </div>
  )
}

export default TodoList