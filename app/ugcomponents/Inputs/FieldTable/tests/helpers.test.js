/**
 * Created by stephenkarpinskyj on 2/5/18.
 */

import helpers from '../helpers';

describe('ugcomponents/Inputs/FieldTable/helpers', () => {
  describe('#modelToArray()', () => {
    it('converts correctly', () => {
      const model = { 1: { x: 2 }, 10: { x: 20 } };
      expect(helpers.modelToArray(model)).toEqual([
        { id: '1', x: 2 },
        { id: '10', x: 20 },
      ]);
    });
    it('converts correctly with no model', () => {
      expect(helpers.modelToArray()).toBeNull();
    });
  });

  describe('#modelToPostArray()', () => {
    it('converts correctly', () => {
      const model = { 1: { x: 2 }, 10: { x: 20 } };
      expect(helpers.modelToPostArray(model)).toEqual([{ x: 2 }, { x: 20 }]);
    });
    it('converts correctly with no model', () => {
      expect(helpers.modelToPostArray()).toBeNull();
    });
  });

  describe('#modelToPatchArray()', () => {
    const model = {
      123: { id: 123, x: 2 },
      456: { x: 20 },
    };
    const defaultValues = [{ id: 123, x: 2 }, { id: 789, x: 1000 }];

    it('converts correctly', () => {
      expect(helpers.modelToPatchArray(model, defaultValues)).toEqual([
        { id: 123, x: 2 },
        { x: 20 },
        { id: 789, isDeleted: true },
      ]);
    });
    it('converts correctly with no defaultValues', () => {
      expect(helpers.modelToPatchArray(model)).toEqual([
        { id: 123, x: 2 },
        { x: 20 },
      ]);
    });
    it('converts correctly with no model or defaultValues', () => {
      expect(helpers.modelToPatchArray()).toBeNull();
    });
  });

  describe('#dotNotationToArray()', () => {
    it('converts correctly', () => {
      const tableValues = {
        'table.1.someProperty': 123,
        'table.1.anotherProperty': 'someValue',
        'table.456.someProperty': 111,
        unrelatedProperty: 123,
      };
      expect(helpers.dotNotationToArray('table', tableValues)).toEqual([
        { id: '1', someProperty: 123, anotherProperty: 'someValue' },
        { id: '456', someProperty: 111 },
      ]);
    });
    it('converts correctly with no model', () => {
      expect(helpers.dotNotationToArray()).toEqual([]);
    });
  });
});
