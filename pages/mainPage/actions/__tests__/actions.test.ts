import { addTaskToTheList, ECandidatesActionTypes } from "../actions";

describe('actions', () => {

  describe('addTaskToTheList', () => {

    it('Передает тип события ADD_TASK_TO_THE_LIST', () => {

      const result = addTaskToTheList('my payload');

      expect(result).toEqual({ type: ECandidatesActionTypes.ADD_TASK_TO_THE_LIST, payload: 'my payload' })
    });
  });
});