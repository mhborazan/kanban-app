import React from "react";
import kanbanStore from "./store";
import Status from "./components/Status";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import NewStatus from "./components/NewStatus";

export default function App() {
  const statuses = kanbanStore((state) => state.statuses);
  const updateStatuses = kanbanStore((state) => state.updateStatuses);
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedStatuses = [...statuses];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStatus] = reorderedStatuses.splice(sourceIndex, 1);
      reorderedStatuses.splice(destinationIndex, 0, removedStatus);
      return updateStatuses(reorderedStatuses);
    }
    const statusSourceIndex = statuses.findIndex(
      (status) => status.id === source.droppableId
    );
    const statusDestinationIndex = statuses.findIndex(
      (status) => status.id === destination.droppableId
    );
    const newSourceTasks = [...statuses[statusSourceIndex].tasks];
    const newDestinationTasks =
      source.droppableId !== destination.droppableId
        ? [...statuses[statusDestinationIndex].tasks]
        : newSourceTasks;
    const taskSourceIndex = source.index;
    const taskDestinationIndex = destination.index;
    const [removedTask] = newSourceTasks.splice(taskSourceIndex, 1);
    newDestinationTasks.splice(taskDestinationIndex, 0, removedTask);
    const newStatutes = [...statuses];
    newStatutes[statusSourceIndex] = {
      ...statuses[statusSourceIndex],
      tasks: newSourceTasks,
    };
    newStatutes[statusDestinationIndex] = {
      ...statuses[statusDestinationIndex],
      tasks: newDestinationTasks,
    };
    updateStatuses(newStatutes);
    console.log("statusSourceIndex", statusSourceIndex);
    console.log("statusDestinationIndex", statusDestinationIndex);
    console.log("newSourceTasks", newSourceTasks);
    console.log("newDestinationTasks", newDestinationTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div>
        <NewStatus />
        <Droppable droppableId="ROOT" type="group" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="container"
            >
              {statuses.map((status, i) => (
                <Draggable draggableId={status.id} key={status.id} index={i}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      {
                        <Status
                          key={i}
                          tasks={status.tasks}
                          title={status.title}
                          id={status.id}
                        />
                      }
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
