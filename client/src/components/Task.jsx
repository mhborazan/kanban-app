import React from "react";
import kanbanStore from "../store";
export default function Task({ id, title, statusId, description }) {
  const removeTask = kanbanStore((state) => state.removeTask);

  return (
    <div className="task">
      <div className="delete">
        <button onClick={() => removeTask(statusId, id)} className="deleteTask">
          x
        </button>
      </div>
      <span style={{ wordWrap: "break-word" }}>{title}</span>
    </div>
  );
}
