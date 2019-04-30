import { createAction } from "../actionCreator";

describe('actioCreator', () => {

  describe('createAction', () => {

    it('Создание экшена', () => {
      const type = 'my type';
      const actionFunc = createAction(type);

      const result = actionFunc('myPayload');

      expect(result).toEqual({ type: 'my type', payload: 'myPayload' });
    })
  })
});
