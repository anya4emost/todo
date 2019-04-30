import { createAction } from "../utils/redux/actionCreator";

export enum ECandidatesActionTypes {
  ADD_TASK_TO_THE_LIST = 'ADD TASK TO THE LIST',
  ON_TASK_CHANGE = 'ON TASK CHANGE',
  ON_TASK_CLICK = 'ON TASK CLICK',
  REMOVE_TASK = 'REMOVE TASK',
  ON_CHECKBOX_CHANGE = 'ON CHECKBOX CHANGE'
}

export const addTaskToTheList = createAction(ECandidatesActionTypes.ADD_TASK_TO_THE_LIST);
export const removeTask = createAction(ECandidatesActionTypes.REMOVE_TASK);
export const onTaskChange = createAction(ECandidatesActionTypes.ON_TASK_CHANGE);
export const onCheckboxChange = createAction(ECandidatesActionTypes.ON_CHECKBOX_CHANGE);
export const onTaskClick = createAction(ECandidatesActionTypes.ON_TASK_CLICK);
