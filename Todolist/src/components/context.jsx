import { useState } from "react"
export default function Content(){
    const [task,settask]=useState("");
    return(
        <>
            <h1>TODO LIST</h1>
            <input type="text" placeholder="Enter Ur Task" onChange={}></input>
            <br></br>
            <button>ADD</button>
            <br></br>
            <h2>MY TODOS</h2>
        </>
    );
}