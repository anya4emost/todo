import { ECandidatesActionTypes } from "../actions/actions";
import {
  remove,
  sortBy,
  prop,
  last,
  when,
  propEq,
  assoc,
  map,
  findIndex,
} from 'ramda';

export const reducer = (state = { activeTask: -1, tasks: [] }, action) => {
  const { payload } = action;
  switch (action.type) {

    case ECandidatesActionTypes.ADD_TASKS_TO_THE_LIST:
      return assoc('tasks', payload, state);

    case ECandidatesActionTypes.ADD_TASK_TO_THE_LIST:
      return assoc('tasks', [
        ...state.tasks,
        {
          id: state.tasks.length ? (last(sortBy(prop('id'))(state.tasks)) as any).id + 1 : 1,
          title: '',
          description: '',
          done: false,
        }
      ], state);

    case ECandidatesActionTypes.SET_ACTIVE_TASK:
      return assoc('activeTask', payload, state);

    case ECandidatesActionTypes.CHANGE_TASK_COMPLETENESS:
      return assoc(
        'tasks',
        map((task) => when(propEq('id', payload.id), assoc('done', !task.done))(task), state.tasks),
        state
      );

    case ECandidatesActionTypes.TASK_CHANGED:
      return assoc(
        'tasks',
        map(when(propEq('id', payload.id), assoc(payload.field, payload.event.target.value)), state.tasks),
        state
      );

    case ECandidatesActionTypes.REMOVE_TASK:
      return assoc('tasks', remove(findIndex(propEq('id', payload))(state.tasks), 1, state.tasks), state);

    default:
      return state

  }
};
