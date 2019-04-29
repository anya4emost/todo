import * as React from 'react';
import { TaskRow } from "./TaskRow";
import { connect } from 'react-redux'
import {
  remove,
  assocPath,
  adjust,
  sortBy,
  compose,
  toLower,
  prop,
  last,
  when,
  propEq,
  assoc,
  map,
  findIndex,
} from 'ramda';
import { addTaskToTheList, onCheckboxChange, onTaskChange, onTaskClick, removeTask } from "../actions/actions";

const styles = require('./taskList.scss');

interface ITask {
  title: string;
  description: string;
  done: boolean
}

interface ITasksListProps {
  addTaskToTheList: Function;
  onTaskChange: Function;
  onTaskClick: Function;
  onCheckboxChange: Function;
  removeTask: Function;
  activeTask: number;
  tasks: ITask[]
}

interface ITasksListState {

}

class TasksListContainer extends React.Component<ITasksListProps, ITasksListState> {



  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks.length < this.props.tasks.length) {
      this.setState({ activeTask: this.props.tasks.length - 1 })
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tasks', JSON.stringify(this.props.tasks));
    }
  }

  render() {
    const { tasks, activeTask } = this.props;

    const allTasks = sortBy(prop('title'))(tasks).reverse().map((task) => (
      <TaskRow
        key={ task.id }
        done={ task.done }
        taskTitle={ task.title }
        taskText={ task.description }
        remove={ (evt) => this.onRemove(evt, task.id) }
        editMode={ activeTask === task.id }
        onChange={ (event, field) => this.onChange(event, task.id, field) }
        onTaskClick={ () => this.onTaskClick(task.id) }
        onButtonClick={ (event) => this.onButtonClick(event) }
        onCheckboxChange={ (event) => this.onCheckboxChange(event, task.id) }
      />
    ));

    return (<>
        {/*<div>{store.getState()}</div>*/ }
        <div className={ styles['tasks-list'] }>
          <div className={ styles['header'] }>ToDo</div>
          { allTasks }
          <div className={ styles['add-task'] } onClick={ this.onAdd }>
            <span>+ add new task</span>
          </div>
        </div>
      </>
    );
  }

  onRemove = (evt, id) => {
    this.props.removeTask({evt, id});
    evt.stopPropagation();
  };

  onAdd = () => {
    this.props.addTaskToTheList();
  };

  onChange = (event, id, field) => {
    this.props.onTaskChange({ event, id, field });
  };

  onTaskClick = (id) => {
    this.props.onTaskClick(id);
  };

  onButtonClick = (event) => {
    this.props.onTaskClick(-1);
    event.stopPropagation();
  };

  onCheckboxChange = (event, id) => {
    this.props.onCheckboxChange({ event, id });
    event.stopPropagation();
  };
}

const mapStateToProps = (state) => {
  return {
    activeTask: state.activeTask,
    tasks: state.tasks
  }
};

const actions = { addTaskToTheList, removeTask, onTaskChange, onTaskClick, onCheckboxChange };

export const TasksList = connect(
  mapStateToProps,
  actions
)(TasksListContainer);
