import { create } from "zustand";
import uniqid from "uniqid";

const kanbanStore = create((set) => ({
  statuses: [],
  newTask: (statusId, title) => {
    set((state) => {
      const updatedStatuses = state.statuses.map((status) => {
        if (status.id === statusId) {
          return {
            ...status,
            tasks: [...status.tasks, { title, id: uniqid() }],
          };
        }
        return status;
      });

      return {
        statuses: updatedStatuses,
      };
    });
  },
  removeTask: (statusId, taskId) => {
    set((state) => {
      const updatedStatuses = state.statuses.map((status) => {
        if (status.id === statusId) {
          return {
            ...status,
            tasks: status.tasks.filter((task) => task.id !== taskId),
          };
        }
        return status;
      });

      return {
        statuses: updatedStatuses,
      };
    });
  },
  newStatus: (title) =>
    set((state) => ({
      statuses: [...state.statuses, { id: uniqid(), title: title, tasks: [] }],
    })),
  removeStatus: (statusId) => {
    set((state) => ({
      statuses: state.statuses.filter((status) => status.id !== statusId),
    }));
  },
  updateStatuses: (statuses) =>
    set((state) => ({
      statuses: [...statuses],
    })),
}));

export default kanbanStore;
