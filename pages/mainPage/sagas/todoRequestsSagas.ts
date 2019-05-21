import { takeEvery, put, select } from 'redux-saga/effects';

import { ECandidatesActionTypes } from "../actions/actions";
import { last, sortBy, prop } from "ramda";
import { getTasks } from "../selectors/todoSelectors";

function* addTaskToTheList() {

  const task = last(yield select(getTasks));

  fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

function* removeTask({ payload }) {
  fetch(`/api/todo/${ payload }`, {
    method: 'DELETE',
  });
}

function* editTask({ payload }) {
  const tasks = yield select(getTasks);
  console.log('sagaPUT');

  fetch('/api/todo', {
    method: 'PUT',
    body: JSON.stringify(tasks.find(task => task.id === payload)),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

export const todoRequestsSagas = [
  takeEvery(ECandidatesActionTypes.ADD_TASK_TO_THE_LIST, addTaskToTheList),
  takeEvery(ECandidatesActionTypes.REMOVE_TASK, removeTask),
  takeEvery(ECandidatesActionTypes.EDIT_TASK, editTask),
];