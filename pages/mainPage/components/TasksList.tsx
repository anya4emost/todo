import * as React from 'react';
import { TaskRow } from "./TaskRow";
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

const styles = require('./taskList.scss');

interface ITask {
  title: string;
  description: string;
  done: boolean
}

interface ITasksListProps {

}

interface ITasksListState {
  activeTask: number;
  tasks: ITask[]
}

class TasksListContainer extends React.Component<ITasksListProps, ITasksListState> {

  state = {
    activeTask: -1,
    tasks: [],
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage.getItem('tasks')) {
      this.setState(JSON.parse(window.localStorage.getItem('tasks')));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks.length < this.state.tasks.length) {
      this.setState({ activeTask: this.state.tasks.length - 1 })
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tasks', JSON.stringify(this.state));
    }
  }

  render() {
    const { tasks, activeTask } = this.state;

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

    return (
      <div className={ styles['tasks-list'] }>
        <div className={ styles['header'] }>ToDo</div>
        { allTasks }
        <div className={ styles['add-task'] } onClick={ this.onAdd }>
          <span>+ add new task</span>
        </div>
      </div>
    );
  }

  onRemove = (evt, id) => {
    const { tasks } = this.state;
    evt.stopPropagation();
    this.setState({ tasks: remove(findIndex(propEq('id', id))(tasks), 1, tasks) });
  };

  onAdd = () => {
    const { tasks } = this.state;

    this.setState({
      tasks: [
        ...tasks,
        {
          id: tasks.length ? last(sortBy(prop('id'))(tasks)).id + 1 : 1,
          title: '',
          description: '',
          done: false,
        }
      ],
    });
  };

  onChange = (event, id, field) => {
    const { tasks } = this.state;
    this.setState({ tasks: map(when(propEq('id', id), assoc(field, event.target.value)), tasks) });
  };

  onTaskClick = (id) => {
    this.setState({ activeTask: id });
  };

  onButtonClick = (event) => {
    this.setState({ activeTask: -1 });
    event.stopPropagation();
  };

  onCheckboxChange = (event, id) => {
    const { tasks } = this.state;

    this.setState({
      tasks: map((task) => when(propEq('id', id), assoc('done', !task.done))(task), tasks),
    });

    event.stopPropagation();
  };
}

export const TasksList = TasksListContainer;
