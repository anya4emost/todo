import { createAction } from "../utils/redux/actionCreator";

export enum ECandidatesActionTypes {
  ADD_TASKS_TO_THE_LIST = 'ADD TASKS TO THE LIST',
  ADD_TASK_TO_THE_LIST = 'ADD TASK TO THE LIST',
  TASK_CHANGED = 'TASK CHANGED',
  SET_ACTIVE_TASK = 'SET ACTIVE TASK',
  REMOVE_TASK = 'REMOVE TASK',
  CHANGE_TASK_COMPLETENESS = 'CHANGE TASK COMPLETENESS',
  EDIT_TASK = 'EDIT TASK'
}

export const addTasksToTheList = createAction(ECandidatesActionTypes.ADD_TASKS_TO_THE_LIST);
export const addTaskToTheList = createAction(ECandidatesActionTypes.ADD_TASK_TO_THE_LIST);
export const removeTask = createAction(ECandidatesActionTypes.REMOVE_TASK);
export const taskChanged = createAction(ECandidatesActionTypes.TASK_CHANGED);
export const changeTaskCompleteness = createAction(ECandidatesActionTypes.CHANGE_TASK_COMPLETENESS);
export const setActiveTask = createAction(ECandidatesActionTypes.SET_ACTIVE_TASK);
export const editTask = createAction(ECandidatesActionTypes.EDIT_TASK);
