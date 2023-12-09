import React, { useState } from "react";
import kanbanStore from "../store";

export default function NewStatus() {
  const newStatus = kanbanStore((state) => state.newStatus);
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
    <div className="newStatusContainer">
      <button className="newStatus" onClick={openModal}>
        Add Status
      </button>
      {isModalOpen && (
        <div className="modal">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Status Title"
          />
          <button
            onClick={() => {
              newStatus(input);
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
