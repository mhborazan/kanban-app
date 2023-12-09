import { create } from "zustand";
import uniqid from "uniqid";
import updateDB from "./hooks/updateStatuses";
import deleteStatus from "./hooks/deleteStatus";

const kanbanStore = create((set, get) => ({
  statuses: [],
  newTask: async (statusId, title) => {
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
    await updateDB(get().statuses);
  },
  removeTask: async (statusId, taskId) => {
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
    await updateDB(get().statuses);
  },
  newStatus: async (title, color) => {
    set((state) => ({
      statuses: [
        ...state.statuses,
        { id: uniqid(), title: title, color, tasks: [] },
      ],
    }));
    await updateDB(get().statuses);
  },
  removeStatus: async (statusId) => {
    set((state) => ({
      statuses: state.statuses.filter((status) => status.id !== statusId),
    }));
    await deleteStatus(statusId);
  },
  updateStatuses: async (statuses) => {
    set((state) => ({
      statuses: [...statuses],
    }));
    await updateDB(statuses);
  },
}));

export default kanbanStore;
