import { reducer } from "../reducer";
import { ECandidatesActionTypes } from "../../actions/actions";

describe('reducer', () => {

  describe('reducer', () => {

    it('Добавление нового таска', () => {

      const action = { type: ECandidatesActionTypes.ADD_TASK_TO_THE_LIST };
      const state = { tasks: [] };

      const result = reducer(state, action);

      expect(result).toEqual({
        tasks: [{
          id: 1,
          title: '',
          description: '',
          done: false,
        }]
      });
    });

    it('Выставляет активный таск', () => {

      const action = { type: ECandidatesActionTypes.SET_ACTIVE_TASK, payload: 12 };
      const state = {};

      const result = reducer(state, action);

      expect(result).toEqual({ activeTask: 12 });
    });

    it('Изменяет и сохраняет значения инпутов', () => {
      const action = {
        type: ECandidatesActionTypes.TASK_CHANGED,
        payload: { event: { target: { value: 'a' } }, id: 1, field: 'title' }
      };

      const state = {
        tasks: [{ id: 1, value: 'b' }],
      };

      const result = reducer(state, action);

      expect(result.tasks[0]).toEqual(expect.objectContaining({ title: 'a' }))
    });

    it('Изменяет значения чекбоксов', () => {
      const action = {
        type: ECandidatesActionTypes.CHANGE_TASK_COMPLETENESS,
        payload: { event: { }, id: 1 }
      };

      const state = {
        tasks: [{ id: 1, done: false }],
      };

      const result = reducer(state, action);

      expect(result.tasks[0]).toEqual(expect.objectContaining({ done: true }))
    });

    it('Удаляет таск', () => {
      const action = {
        type: ECandidatesActionTypes.REMOVE_TASK,
        payload: { id: 1 }
      };

      const state = {
        tasks: [{ id: 1, done: false }],
      };

      const result = reducer(state, action);

      expect(result.tasks[0]).toBeUndefined()
    });
  });
});