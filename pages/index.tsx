import * as React from 'react';
import { createStore, compose } from "redux";
import { reducer } from './mainPage/reducers';
import { TasksList } from './mainPage/components';
import { Provider } from "react-redux";

let initialState =
    {
      activeTask: -1,
      tasks: [],
    };

if (typeof window !== 'undefined' && window.localStorage.getItem('tasks')) {
  initialState.tasks=JSON.parse(window.localStorage.getItem('tasks'));
}

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducer,
  initialState as any,
  composeEnhancers(),
);

function Home() {
  return (
    <Provider store={ store }>
      <TasksList/>
    </Provider>
  )
}

export default Home;
