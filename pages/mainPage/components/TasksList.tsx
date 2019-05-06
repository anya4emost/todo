import * as React from 'react';
import { TaskRow } from "./TaskRow";
import { connect } from 'react-redux'
import { sortBy, prop, } from 'ramda';
import { addTaskToTheList, changeTaskCompleteness, taskChanged, setActiveTask, removeTask } from "../actions/actions";

const styles = require('./taskList.scss');

interface ITask {
  id:number;
  title: string;
  description: string;
  done: boolean
}

interface ITasksListProps {
  addTaskToTheList: Function;
  taskChanged: Function;
  setActiveTask: Function;
  changeTaskCompleteness: Function;
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
    this.props.removeTask( id);
    evt.stopPropagation();
  };

  onAdd = () => {
    this.props.addTaskToTheList();

    fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify(this.props.tasks),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  };

  onChange = (event, id, field) => {
    this.props.taskChanged({ event, id, field });
  };

  onTaskClick = (id) => {
    this.props.setActiveTask(id);
  };

  onButtonClick = (event) => {
    this.props.setActiveTask(-1);
    event.stopPropagation();

    fetch('/api/todo', {
      method: 'PUT',
      body: JSON.stringify(this.props.tasks),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  };

  onCheckboxChange = (event, id) => {
    this.props.changeTaskCompleteness({ event, id });
    event.stopPropagation();
  };
}

const mapStateToProps = (state) => {
  return {
    activeTask: state.activeTask,
    tasks: state.tasks
  }
};

const actions = { addTaskToTheList, removeTask, taskChanged, setActiveTask, changeTaskCompleteness };

export const TasksList = connect(
  mapStateToProps,
  actions
)(TasksListContainer);
