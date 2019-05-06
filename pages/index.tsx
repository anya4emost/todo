import * as React from 'react';
import { TasksList } from './mainPage/components';
import { Provider } from "react-redux";
import { addTasksToTheList } from "./mainPage/actions/actions";

class Home extends React.PureComponent<{}, {}> {

  static async getInitialProps({ req, res, store, query: { tasks }, isServer }) {

    if (isServer) {
      store.dispatch(addTasksToTheList(tasks));
    }

    return {};
  }

  render() {
    return (
      <TasksList/>
    )
  }
}

export default Home;
