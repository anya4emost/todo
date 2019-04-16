import * as React from 'react';
import { GarbageIcon } from './garbage';
import * as cs from 'classnames';
import { EditIcon } from "./edit";

const styles = require('./taskRow.scss');

interface ITaskRowProps {
  taskTitle: string;
  taskText: string;
  done: boolean;
  onChange: Function;
  editMode: boolean;
  onTaskClick(): void;
  remove(event:React.MouseEvent): void;
  onCheckboxChange(event:React.MouseEvent): void;
  onButtonClick(event:React.MouseEvent): void;
}

export const TaskRow = (props: ITaskRowProps) => {
  const { done, taskTitle, taskText, remove, editMode, onChange, onTaskClick, onButtonClick, onCheckboxChange } = props;

  const input = (
    <div className={ styles['input'] }>
      <label>Title:</label>
      <input type='text' value={ taskTitle } onChange={ (event) => onChange(event, 'title') }/>
    </div>
  );

  const textArea = (
    <div className={ styles['text-area'] }>
      <label>Description:</label>
      <textarea value={ taskText } onChange={ (event) => onChange(event, 'description') }/>
    </div>
  );

  return (
    <div className={ cs(styles['task'], { [styles['edit']]: editMode }, { [styles['done']]: done }) }
         onClick={ onTaskClick }>
      <div>
        <input type="checkbox" checked={ done } onClick={ onCheckboxChange }/>
        { editMode ? <div>{ input }</div> : <span>{ taskTitle }</span> }
        <div className={ cs(styles['edit-icon'], styles['svg']) } onClick={onTaskClick }><EditIcon/></div>
        <div className={ styles['svg'] } onClick={ remove }><GarbageIcon/></div>
      </div>
      <div className={ styles['description'] }>
        { editMode ? <div>{ textArea }</div> : <span>{ taskText }</span> }
      </div>
      { editMode ? <button onClick={ onButtonClick }>Save</button> : null }
    </div>
  );
};
