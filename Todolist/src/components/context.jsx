import { useState } from "react"
export default function Content(){
    const [task,settask]=useState("");
    const [todos,settodos]=useState([]);
    return(
        <>
            <h1>TODO LIST</h1>
            <input type="text" onChange={(event)=>settask(event.target.value)}  placeholder="Enter Ur Task"></input>
            <br></br>
            <button onClick={()=>{if(task===""){
                    alert("Enter task inside the input field");
                }else{
                    settodos([...todos,task]); settask("");
                }
            }}>
            ADD</button>
            <br></br>
            <h2>MY TODOS</h2>
            <ul>
                {todos.map((todo)=>(
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
            {todos.map((todo)=>(
                <>
                <h2>{todo}</h2>
                <button>Delete</button>
                </>
            )
            )}
        </>
    );
}