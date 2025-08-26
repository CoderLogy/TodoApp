import React, { useEffect } from 'react'
import { ReactSortable } from "react-sortablejs"
import { HexColorPicker } from 'react-colorful'
import useLocalStorageState from 'use-local-storage-state'

const Screen = ({ todos, setTodos, newTodo, setNewTodo, addTodo, editTodo, deleteTodo, showAlert, handleCheckboxes, setColorBg, bgcolor}) => {
const [fgcolor, setColorFg] = useLocalStorageState("fgcolor", { defaultValue: "#F5E7D4" })
function isColorDark(hexColor) {
    // Remove '#' if present
    const hex = hexColor.replace("#", "");

    // Convert 3-digit hex to 6-digit
    const fullHex =
      hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;

    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    // Formula for relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.5; // true if color is dark
  }

  useEffect(() => {
    const theme = isColorDark(fgcolor,) ? "denman-street" : "cupcake";
    document.documentElement.setAttribute("data-theme", theme);
  }, [fgcolor]);
  
  return (
    <div className="screen shadow-lg shadow-zinc-600 rounded-lg" style={{ backgroundColor: fgcolor, transition: "background-color 5.6s ease"}}>
      {showAlert && <div role="alert" className="alert mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Please Type a todo before adding.</span>
      </div>}
      <div className="w-full max-w-sm max-h-screen sm:max-w-md md:max-w-lg sm:w-120 min-h-[35rem] sm:min-h-[45rem] md:min-h-[50rem] overflow-y-auto mx-auto p-4 sm:p-8 ">
        <h1 className="text-center text-2xl my-2">My Todo</h1>
        <div className="flex flex-col ml- sm:flex-row justify-around my-5 gap-2.5">
          <input type="text" placeholder="Add a new todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addTodo(newTodo) }} className="input input-md p-5 text-[16px] focus:shadow-md border-0 focus:outline-none" />
          <button className="w-80 sm:w-20 sm:mx-2 btn" onClick={addTodo}>Save</button>
        </div>
        <label htmlFor="my_modal_6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            className="absolute right-3 top-3 w-10 h-10 cursor-pointer"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 .94l-.05.1a2 2 0 1 1-3.58 0l-.05-.1a1.65 1.65 0 0 0-1-.94 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-.94-1l-.1-.05a2 2 0 1 1 0-3.58l.1-.05a1.65 1.65 0 0 0 .94-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.05a1.65 1.65 0 0 0 1-.94l.05-.1a2 2 0 1 1 3.58 0l.05.1a1.65 1.65 0 0 0 1 .94h.05a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.05a1.65 1.65 0 0 0 .94 1l.1.05a2 2 0 1 1 0 3.58l-.1.05a1.65 1.65 0 0 0-.94 1z" />
          </svg>

        </label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle"/>
        <div className="modal" role="dialog">
          <div className="modal-box bg-base-100 ">
            <h3 className="text-lg sm:text-lg font-bold">Settings</h3>
            <div className="pallete flex flex-col items-center space-y-2 ">
            <p className="py-4">Pick a Background Color: </p>
            <HexColorPicker color={bgcolor} onChange={setColorBg}/>
            <p className="py-4">Pick a Foreground Color: </p>
            <HexColorPicker color={fgcolor} onChange={setColorFg}/>
            <button className="btn my-2" onClick={() => { setColorBg("#F2BFA4"); setColorFg("#F5E7D4") }}>Revert</button>
            </div>
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
                      <button className="btn btn-sm sm:btn-md text-md flex-1 w-20" onClick={() => { editTodo(todo.id) }}>Edit</button>
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