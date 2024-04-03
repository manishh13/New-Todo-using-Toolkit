import React, { useEffect } from "react";
import { useState } from "react";
import {
  addTask,
  deleteTask,
  CompleteTask,
  unCompleteTask,
  editData,
  MyEditSave
} from "./todoSlice";

import { useDispatch, useSelector } from "react-redux";

var editFlag = 0;

const Dispaly = () => {
  var sno = 0;
 

  const [val, setVal] = useState("");
  const [editBtnFlag, setEditBtnFlag]= useState(true);
  const [tmpId, setTmpId]= useState("");
  const mydata = useSelector((state) => state.todo.task);
  const myeditData = useSelector((state) => state.todo.workdata);
  const MyDispach = useDispatch();


  console.log(myeditData);

  const myTaskAdd = () => {
    MyDispach(addTask(val));
    setVal("")
  };
    
  const myTaskDelete = (myid) => {
    MyDispach(deleteTask(myid));
  };

  const myTaskComplete = (myid) => {
    MyDispach(CompleteTask(myid));
  };

  const myTaskUncomplete = (myid) => {
    MyDispach(unCompleteTask(myid));
  };

  const myTaskEdit = (myid) => {
    MyDispach(editData(myid));
    editFlag++;
    setEditBtnFlag(false);
    setTmpId(myid);

  };

 useEffect(()=>{

  setVal(myeditData);
 }, [editFlag]);


const editDataSave=()=>{
    
    MyDispach(MyEditSave({id:tmpId, myData: val  }))
    setEditBtnFlag(true);
   setVal("")
  
}


  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td>
            {key.status ? (
              key.work
            ) : (
              <span style={{ color: "red", textDecoration: "line-through" }}>
                {key.work}
              </span>
            )}
          </td>
          <td>
            <button
              onClick={() => {
                myTaskDelete(key.id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                myTaskComplete(key.id);
              }}
            >
              Complete
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                myTaskUncomplete(key.id);
              }}
            >
              UnComplete
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                myTaskEdit(key.id);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      Enter Task :{" "}
      <input
        type="text"
        placeholder="Enter task here..."
        name="task"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      
      {editBtnFlag?   <button onClick={myTaskAdd}>Add task</button> :  <button onClick={editDataSave}> Edit save</button> }
     
    


      <hr size="4" color="blue" />
      <table width="700" border="1" bgcolor="pink">
        <tr bgcolor="#ffc107">
          <th>Sno</th>
          <th>MyTask</th>
          <th>Delete</th>
          <th>Complete</th>
          <th>Un-Complete</th>
          <th> edit</th>
        </tr>
        {ans}
      </table>
    </>
  );
};

export default Dispaly;
