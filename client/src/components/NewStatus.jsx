import React, { useState } from "react";
import kanbanStore from "../store";
import ColorPicker from "./ColorPicker";

export default function NewStatus() {
  const newStatus = kanbanStore((state) => state.newStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#2D9596");

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="newStatusContainer">
      <button className="newStatus" onClick={openModal}>
        Add Status
      </button>
      {isModalOpen && (
        <div className="modal">
          <ColorPicker setColor={setColor} />
          <input
            style={{ backgroundColor: color }}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Status Title"
          />
          <button
            onClick={() => {
              newStatus(input, color);
              setInput("");
              closeModal();
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
