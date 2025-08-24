import React,{useState} from 'react'
import { ReactSortable } from "react-sortablejs"

const Screen = ({ todos, setTodos,newTodo, setNewTodo, addTodo, editTodo, deleteTodo, showAlert, handleCheckboxes, setColor}) => {
  const [color, setLocalColor] = useState("#F2BFA4")
  const handleColorChange= (e)=>{
    setLocalColor(e.target.value)
    setColor(color)
  }
  return (
    <div className="screen rounded-lg" style={{ backgroundColor: "#F5E7D4"}}>
      {showAlert && <div role="alert" className="alert mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Please Type a todo before adding.</span>
      </div>}
      <div className="w-full max-w-sm max-h-screen sm:max-w-md md:max-w-lg sm:w-120 min-h-[35rem] sm:min-h-[45rem] md:min-h-[50rem] overflow-y-auto mx-auto p-4 sm:p-8 ">
        <h1 className="text-center text-2xl my-2">My Todo</h1>
        <div className="flex flex-col ml-3 sm:flex-row justify-around my-5 gap-2.5">
          <input type="text" placeholder="Add a new todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTodo(newTodo) }} className="input input-md p-5 shadow-md border-0 focus:outline-none" />
          <button className="w-80 sm:w-auto btn" onClick={addTodo}>Save</button>
        </div>
        <label htmlFor="my_modal_6">
          <svg className="absolute right-3 top-3 w-10 h-10 cursor-pointer" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="1" id="_1"><path d="M293.9,450H233.53a15,15,0,0,1-14.92-13.42l-4.47-42.09a152.77,152.77,0,0,1-18.25-7.56L163,413.53a15,15,0,0,1-20-1.06l-42.69-42.69a15,15,0,0,1-1.06-20l26.61-32.93a152.15,152.15,0,0,1-7.57-18.25L76.13,294.1a15,15,0,0,1-13.42-14.91V218.81A15,15,0,0,1,76.13,203.9l42.09-4.47a152.15,152.15,0,0,1,7.57-18.25L99.18,148.25a15,15,0,0,1,1.06-20l42.69-42.69a15,15,0,0,1,20-1.06l32.93,26.6a152.77,152.77,0,0,1,18.25-7.56l4.47-42.09A15,15,0,0,1,233.53,48H293.9a15,15,0,0,1,14.92,13.42l4.46,42.09a152.91,152.91,0,0,1,18.26,7.56l32.92-26.6a15,15,0,0,1,20,1.06l42.69,42.69a15,15,0,0,1,1.06,20l-26.61,32.93a153.8,153.8,0,0,1,7.57,18.25l42.09,4.47a15,15,0,0,1,13.41,14.91v60.38A15,15,0,0,1,451.3,294.1l-42.09,4.47a153.8,153.8,0,0,1-7.57,18.25l26.61,32.93a15,15,0,0,1-1.06,20L384.5,412.47a15,15,0,0,1-20,1.06l-32.92-26.6a152.91,152.91,0,0,1-18.26,7.56l-4.46,42.09A15,15,0,0,1,293.9,450ZM247,420h33.39l4.09-38.56a15,15,0,0,1,11.06-12.91A123,123,0,0,0,325.7,356a15,15,0,0,1,17,1.31l30.16,24.37,23.61-23.61L372.06,328a15,15,0,0,1-1.31-17,122.63,122.63,0,0,0,12.49-30.14,15,15,0,0,1,12.92-11.06l38.55-4.1V232.31l-38.55-4.1a15,15,0,0,1-12.92-11.06A122.63,122.63,0,0,0,370.75,187a15,15,0,0,1,1.31-17l24.37-30.16-23.61-23.61-30.16,24.37a15,15,0,0,1-17,1.31,123,123,0,0,0-30.14-12.49,15,15,0,0,1-11.06-12.91L280.41,78H247l-4.09,38.56a15,15,0,0,1-11.07,12.91A122.79,122.79,0,0,0,201.73,142a15,15,0,0,1-17-1.31L154.6,116.28,131,139.89l24.38,30.16a15,15,0,0,1,1.3,17,123.41,123.41,0,0,0-12.49,30.14,15,15,0,0,1-12.91,11.06l-38.56,4.1v33.38l38.56,4.1a15,15,0,0,1,12.91,11.06A123.41,123.41,0,0,0,156.67,311a15,15,0,0,1-1.3,17L131,358.11l23.61,23.61,30.17-24.37a15,15,0,0,1,17-1.31,122.79,122.79,0,0,0,30.13,12.49,15,15,0,0,1,11.07,12.91ZM449.71,279.19h0Z" /><path d="M263.71,340.36A91.36,91.36,0,1,1,355.08,249,91.46,91.46,0,0,1,263.71,340.36Zm0-152.72A61.36,61.36,0,1,0,325.08,249,61.43,61.43,0,0,0,263.71,187.64Z" /></g></svg>
        </label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-md sm:text-lg font-bold">Settings</h3>
            <p className="py-4">Pick a Background Color</p>
            <input
              type="color"
              value={color}
              onChange={handleColorChange} // directly update parent
              style={{
                width: "60px",
                height: "60px",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
            <button className="btn" onClick={()=>setColor("#F2BFA4")}>Revert</button>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">Close!</label>
            </div>
          </div>
        </div>
        <div className="todos">
          {todos.length == 0 && <div className="mx-10 my-10">No Todos to display</div>}
          {todos.length > 0 && (
            <ReactSortable list={todos} setList={setTodos} animation={150}>
              {todos.map(todo => (
                  <div key={todo.id} className="todos flex text-md sm:text-xl my-7 justify-between">
                    <label className="flex items-center space-x-2 mx-7 lg:mx-6">
                      <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxes(todo.id)} className="checkbox checkbox-md sm:checkbox-lg" />
                      <span className={`mx-1.5 -mt-0.5 break-all ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>{todo.todo}</span>
                    </label>
                    <div className="flex gap-0 sm:gap-2">
                      <button className="btn btn-sm sm:btn-md text-md flex-1" onClick={() => { editTodo(todo.id) }}>Edit</button>
                      <button className="btn btn-sm sm:btn-md text-md mx-3 flex-1" onClick={() => { deleteTodo(todo.id) }}>Delete</button>
                    </div>
                  </div>
                
              ))}
            </ReactSortable>
          )}
        </div>
      </div>
    </div>
  )
}

export default Screen