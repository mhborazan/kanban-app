import React, { useState } from "react";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import kanbanStore from "../store";

export default function Status({ tasks, title, id, color }) {
  const newTask = kanbanStore((state) => state.newTask);
  const removeStatus = kanbanStore((state) => state.removeStatus);

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="status"
          style={{ backgroundColor: color }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="statusHeader">
            <button onClick={() => removeStatus(id)} className="deleteTask">
              x
            </button>
            <span className="title">{title}</span>
            <button onClick={openModal} className="newTask">
              +
            </button>
          </div>
          {isModalOpen && (
            <div className="modal">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Task Title"
              />
              <button
                onClick={() => {
                  newTask(id, input);
                  setInput("");
                  closeModal();
                }}
              >
                Add
              </button>
            </div>
          )}
          {tasks.map((task, i) => (
            <Draggable draggableId={task.id} index={i} key={task.id}>
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <Task key={i} title={task.title} id={task.id} statusId={id} />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
