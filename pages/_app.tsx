import * as React from 'react'
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { applyMiddleware, createStore, compose } from 'redux';
import { reducer } from './mainPage/reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import nextReduxWrapper from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import { rootSaga } from './mainPage/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const makeStore = (initialState) => {

  const composeEnhancers =
    (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  (store as any).runSagaTask = () => {
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  };

  (store as any).stopSaga = async () => {
    // Avoid running twice
    if (!(store as any).sagaTask) {
      return;
    }

    store.dispatch(END);
    await (store as any).sagaTask.done;
    (store as any).sagaTask = null;
  };

  (store as any).execSagaTasks = async (isServer, tasks) => {
    // run saga
    (store as any).runSagaTask();
    // dispatch saga tasks
    tasks(store.dispatch);
    // Stop running and wait for the tasks to be done
    await (store as any).stopSaga();
    // Re-run on client side
    if (!isServer) {
      (store as any).runSagaTask();
    }
  };

  // Initial run
  (store as any).runSagaTask();

  return store;
};

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      }
    };
  }

  render() {
    const { Component, pageProps, store } = ((this as any).props as any);

    return (
      <Container>
        <Provider store={ store }>
          <Component { ...pageProps } />
        </Provider>
      </Container>
    );
  }
}

export default nextReduxWrapper(makeStore)(nextReduxSaga(MyApp));
