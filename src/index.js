import ReactDOM from 'react-dom';
import './index.css'
import { useEffect, useState ,useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertBox from './components/Alert';

function App()
{
const [todos,setTodos]=useState([]);
const [title,setTitle]=useState(''
);
const [search, setSearch] = useState('');
const [editId,setEditId]=useState('');
const [alertt,setAlert]=useState(false);
const [dummy,setDummy]=useState(0);
const [filter,setFilter]=useState(0);
const [sort,setSort]=useState('default');
const [priority,setPriority]=useState('lowPriority');
const [dueDate,setDueDate]=useState('');
const [reminderTime,setReminderTime]=useState('');
const [proxyTodos,setProxyTodos]=useState([]);
useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(storedTasks,'ds');
    if(storedTasks!=null
        )
    {
        setTodos(storedTasks);
        setProxyTodos(storedTasks);
    }
     setReminder(storedTasks);
    // displayTask();
}, []);
const  AddTask=()=> {

    // return(
    //     <></>
    // )
    if(title=='' || dueDate=='')
    {
            setAlert(true);
            setTimeout(()=>{setAlert(false)},3000);
    }
    else{
    if(editId=='')
    {

    const item={title,completed:false,id:uuidv4(),dueDate:dueDate,priority,reminderTime};
  localStorage.setItem('tasks', JSON.stringify([...todos,item]));
  setTodos([...todos,item]);
 setProxyTodos([...todos,item]);
 setReminder([...todos,item]);
setTitle('');
setDueDate('');
setReminderTime('')
    }
    else
    {
        let oldTask=todos.find((todo)=> todo.id==editId);
        console.log(editId,'edit');
        // setTodos([...todos,{title,completed:oldTask.completed,id:editId}]);
        const newTodos=todos.map((todo)=>todo.id==editId?{title,completed:oldTask.completed,id:editId,dueDate:dueDate,priority,reminderTime}:todo);
        setTodos(newTodos);
        setProxyTodos(newTodos);
        localStorage.setItem('tasks', JSON.stringify(newTodos));
        setReminder(newTodos);
        setTitle('');
        setEditId('');
        // setPriority()
setDueDate('');
setReminderTime('')
    }

  setReminder();
}
}
const markAsDone=(todo,index)=>{

   todo.completed= todo.completed==true?false:true;
   localStorage.setItem('tasks', JSON.stringify(todos));

   if(dummy==0)
   {
    setDummy(1);
   }
   else{
    setDummy(0);
   }
}
// const onChangeTaskTitle=()
// =>{
//   SVGTextPositioningElement()
// }

const handleDelete=(todo,index)=>
{
// if(index==todo)

setTodos(todos.filter((todo,indexT)=> indexT!==index));
setProxyTodos(todos.filter((todo,indexT)=> indexT!==index));
}



//   useEffect(()=>{
//     // console.log(filteredTodos);
   
//     },[search])
  const handleEdit=(todo,index)=>
  {
   setTitle(todo.title);
   setDueDate(todo.dueDate);
   setReminderTime(todo.reminderTime);
   setPriority(todo.priority);
   setEditId(todo.id);
   
    
  }
const handleSort=(sortValue)=>{


    // var sortSelect = document.getElementById("sortSelect");
    var sortOption = sortValue;
    console.log(sortOption,'ds ',todos,'fdfds');
    switch (sortOption) {
        case "dueDate":
            proxyTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        case "priority":
            proxyTodos.sort((a, b) => priorityToValueFunc(b.priority) - priorityToValueFunc(a.priority));
            break;
        default:
            setProxyTodos(todos);
            console.log(todos,'tt');
            break;
    }
}
function priorityToValueFunc(priority) 
 {
    switch (priority) {
        case "lowPriority":
            return 1;
        case "mediumPriority":
            return 2;
        case "highPriority":
            return 3;
        default:
            return 0;
    }
  }

  function handleSearch(search)
  {
    let filteredTodos = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(search.toLowerCase());
      });
      setProxyTodos(filteredTodos)
  }

  function handleFilter(filter)
  {
    let filteredTodos;
      switch(filter)
      {
        case 'Pending':
            filteredTodos=todos.filter((todo)=>{
                let pending=false;
                // Convert your datetime string to a Date object
                let yourDate = new Date(todo.dueDate);
            
                // Get the current date and time
                let now = new Date();
            
                // Check if the current date and time is greater than your date
                if (now > yourDate) {
                //   console.log("The date has passed.");
                
                } else {
                //   console.log("The date has not passed.");
                pending=true;
                }
            
              return  todo.completed==false && pending==true;
            })
             break;
            case "Missed":
                filteredTodos=todos.filter((todo)=>{
                    let pending=false;
                    // Convert your datetime string to a Date object
                    let yourDate = new Date(todo.dueDate);
                
                    // Get the current date and time
                    let now = new Date();
                
                    // Check if the current date and time is greater than your date
                    if (now > yourDate) {
                    //   console.log("The date has passed.");
                    
                    } else {
                    //   console.log("The date has not passed.");
                    pending=true;
                    }
                
                  return  todo.completed==false && pending==false;
                })
                break;
                case 'Completed':
                    filteredTodos=todos.filter((todo)=>{
                        
                      return  todo.completed==false?false:true;
                    })
                 break;
                default:
                    setProxyTodos(todos);
                        break;
      }
     if(filter!='default')
      setProxyTodos(filteredTodos);
  }


  function setReminder(todoss) {
    todoss?.map((todo)=>{

        const now = new Date();
        const reqdTime=new Date(todo.reminderTime);
          const timeUntilReminder =  reqdTime.getTime()- now.getTime();
        console.log(timeUntilReminder,'time00');
          if (timeUntilReminder > 0) {
              setTimeout(function() {
                  alert('Reminder for task: ' + todo.title);
              }, timeUntilReminder);
          }

    })
   
  }
return(
<>
{alertt && <AlertBox message="Please fill in all the details" type="error" />}
  <div className='container'>
    <div className='filterSearch'>
    <input 
        type="text" 
        placeholder="Search todos..."
        value={search}
        className='searchBar'
        onChange={event => {setSearch(event.target.value);handleSearch(event.target.value)}} 
      />
    </div>
  
   <div className='creationArea'>
       
     <div className='inputField1'>
        <h1>Title</h1>
        <input className='taskTitle' id='taskTitle' placeholder='add a task' value={title} onChange={(e)=>{setTitle(e.target.value)}} maxLength={30} />

     </div>
     <div className='dueDate'>
        <span>Due Date</span>
        <input className='dueDateInput' id='dueDateInput' type="datetime-local" value={dueDate} onChange={(e)=>{setDueDate(e.target.value);console.log(e.target.value,'dd');}}/>

     </div>
     
     <div class="reminder">
     <span> Add Reminder</span>
          <input type="datetime-local" id="reminderTime" value={reminderTime} onChange={(e)=>{setReminderTime(e.target.value);console.log(e.target.value,'rr');}}/>
       
          
         </div>
         <div className='priority'>
            
          <span>Priority</span>
         <select id="priorityList" value={priority} onChange={(e)=>{setPriority(e.target.value);console.log(e.target.value,'p ');}}>
                <option value="lowPriority">Low Priority</option>
                <option value="mediumPriority">Medium Priority</option>
                <option value="highPriority">High Priority</option>
              </select>
         </div>
     <div className='AddTaskBut'>
        <button className='addTaskButton' onClick={AddTask}>{editId==''?'Add':'Edit'} Task</button>
     </div>

   </div>

   <div className='filterAndSort'>
    <span>Sort:</span>
   <select id="sortSelect" onChange={(e)=>{setSort(e.target.value);handleSort(e.target.value);}} value={sort}>
          <option value="default">Default</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
<span>Filter:</span>
       <select id="FilterList" onChange={(e)=>{setFilter(e.target.value);handleFilter(e.target.value);}} value={filter}>
                <option value="default">Default</option>
                <option value="Pending">Pending Task</option>
                <option value="Missed">Missed Task</option>
                <option value='Completed'>Completed</option>
         </select>      
     </div>
<div className="grid-container" id='grid-container'>

    {
        proxyTodos.map((todo,index)=>{
            // let yourDatetimeString = "2023-07-30T14:50";
            let pending=false;
            // Convert your datetime string to a Date object
            let yourDate = new Date(todo.dueDate);
        
            // Get the current date and time
            let now = new Date();
        
            // Check if the current date and time is greater than your date
            if (now > yourDate) {
            //   console.log("The date has passed.");
            
            } else {
            //   console.log("The date has not passed.");
            pending=true;
            }
        
            return(
                <div className={`grid-item  ${todo.completed?'markDone':''} ${todo.priority=='lowPriority'?'lowPriority':todo.priority=='mediumPriority'?'mediumPriority':'highPriority'}`}>
                 <div className='priorityOrPending'>
                    <span>{todo.priority=='lowPriority'?'Low Priority':todo.priority=='mediumPriority'?'Medium Priority':'High Priority'}</span>
                    {/* <span>{todo.dueDate}</span> */}
 
                    {/* {todo.dueDate-  } */}
                        {todo.completed==true?'completed':pending==true?'pending':'missed'}
                    
                    </div>
                <div className='title-item'>
                {/* <h1>Title</h1> */}
                {console.log(todo,'todo')}
                <h1>{todo.title}</h1>
                </div>

                <div className='dueTask'>
                    <span>DueDate:</span>
                    <span>{todo.dueDate}</span>
                    </div>
                <div className='list-item-func'>
                    <input type='checkbox' className='markAsDone' onClick={()=>{markAsDone(todo,index)}}/>
                    <button className='deleteButton' onClick={()=>{handleDelete(todo,index)}}>Delete</button>
                    <button className='editButton' onClick={()=>{handleEdit(todo,index)}}>Edit</button>
                </div>
               </div>
            )
        
        })
    }
</div>
  </div>
</>
)

}
ReactDOM.render(
  <App/>  ,document.getElementById('root')
);