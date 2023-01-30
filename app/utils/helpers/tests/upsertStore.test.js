import React from 'react';
import upsertHelpers, { ARRAY_MODE } from '../upsertStore';

describe('utils/helpers/upsertStore', () => {
  describe('#object()', () => {
    const store = { a: { x: 1, z: 'z' }, b: [1, 2], c: [0] };
    const obj = { a: { x: 2, y: 3 }, b: [2, 3] };

    it('upserts correctly when setting', () => {
      expect(upsertHelpers.object(obj, true)(store)).toEqual(obj);
      expect(upsertHelpers.object(obj, true)()).toEqual(obj);
    });
    it('upserts correctly when merging', () => {
      expect(upsertHelpers.object(obj, false)(store)).toEqual({
        a: obj.a,
        b: obj.b,
        c: store.c,
      });
    });
    it('handles null obj when merging', () => {
      expect(() => upsertHelpers.object(null, false)(store)).not.toThrow();
    });
  });

  describe('#array()', () => {
    const store = [1, 2];
    const array = [2, 3];

    it('upserts correctly in SET mode', () => {
      expect(upsertHelpers.array(array, ARRAY_MODE.SET)(store)).toEqual(array);
      expect(upsertHelpers.array(array, ARRAY_MODE.SET)()).toEqual(array);
    });
    it('upserts correctly in PREPEND mode', () => {
      expect(upsertHelpers.array(array, ARRAY_MODE.PREPEND)(store)).toEqual([
        3,
        1,
        2,
      ]);
    });
    it('upserts correctly in APPEND mode', () => {
      expect(upsertHelpers.array(array, ARRAY_MODE.APPEND)(store)).toEqual([
        1,
        2,
        3,
      ]);
    });
    it('upserts correctly in default mode', () => {
      expect(upsertHelpers.array(array)(store)).toEqual([1, 2, 3]);
    });
    it('upserts correctly in unknown mode', () => {
      expect(upsertHelpers.array(array, 'unknownMode')(store)).toEqual(store);
    });
    it('handles null array in non-set mode', () => {
      expect(() =>
        upsertHelpers.array(null, ARRAY_MODE.APPEND)(store),
      ).not.toThrow();
    });
  });

  describe('#deepMerge()', () => {
    const key1 = 1;
    const key2 = 2;
    const key3 = 3;
    const keyA = 'a';
    const keyB = 'b';
    const keyC = 'c';
    const keyD = 'd';
    const keyE = 'e';
    const keyW = 'w';
    const keyX = 'x';
    const keyY = 'y';
    const keyZ = 'z';

    const xStore = 1;
    const zStore = 'z';
    const aStore = {};
    const bStore = { [keyX]: xStore, [keyZ]: zStore };
    const cStore = [1, 2];
    const dStore = [0];
    const eStore = 'a';
    const oneStore = { [keyA]: aStore };
    const twoStore = {
      [keyB]: bStore,
      [keyC]: cStore,
      [keyD]: dStore,
      [keyE]: eStore,
    };

    const wObj = jest.fn();
    const xObj = <div />;
    const yObj = 3;
    const bObj = { [keyW]: wObj, [keyX]: xObj, [keyY]: yObj };
    const cObj = [2, 3];
    const eObj = undefined;
    const twoObj = { [keyB]: bObj, [keyC]: cObj, [keyE]: eObj };
    const threeObj = {};

    const store = { [key1]: oneStore, [key2]: twoStore };
    const obj = { [key2]: twoObj, [key3]: threeObj };

    const bMerged = { ...bStore, ...bObj };
    const cPrepended = upsertHelpers.array(cObj, ARRAY_MODE.PREPEND)(cStore);
    const cAppended = upsertHelpers.array(cObj, ARRAY_MODE.APPEND)(cStore);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      expect(wObj).not.toBeCalled();
    });

    it('upserts correctly in SET array mode', () => {
      expect(upsertHelpers.deepMerge(obj, ARRAY_MODE.SET)(store)).toEqual({
        [key1]: oneStore,
        [key2]: {
          [keyB]: bMerged,
          [keyC]: cObj,
          [keyD]: dStore,
          [keyE]: eStore,
        },
        [key3]: threeObj,
      });
      expect(upsertHelpers.deepMerge(obj, ARRAY_MODE.SET)()).toEqual(obj);
    });
    it('upserts correctly in PREPEND array mode', () => {
      expect(upsertHelpers.deepMerge(obj, ARRAY_MODE.PREPEND)(store)).toEqual({
        [key1]: oneStore,
        [key2]: {
          [keyB]: bMerged,
          [keyC]: cPrepended,
          [keyD]: dStore,
          [keyE]: eStore,
        },
        [key3]: threeObj,
      });
    });
    it('upserts correctly in APPEND array mode', () => {
      expect(upsertHelpers.deepMerge(obj, ARRAY_MODE.APPEND)(store)).toEqual({
        [key1]: oneStore,
        [key2]: {
          [keyB]: bMerged,
          [keyC]: cAppended,
          [keyD]: dStore,
          [keyE]: eStore,
        },
        [key3]: threeObj,
      });
    });
    it('upserts correctly in default array mode', () => {
      expect(upsertHelpers.deepMerge(obj)(store)).toEqual({
        [key1]: oneStore,
        [key2]: {
          [keyB]: bMerged,
          [keyC]: cAppended,
          [keyD]: dStore,
          [keyE]: eStore,
        },
        [key3]: threeObj,
      });
    });
    it('upserts correctly in unknown array mode', () => {
      expect(upsertHelpers.deepMerge(obj, 'unknownMode')(store)).toEqual({
        [key1]: oneStore,
        [key2]: {
          [keyB]: bMerged,
          [keyC]: cStore,
          [keyD]: dStore,
          [keyE]: eStore,
        },
        [key3]: threeObj,
      });
    });
    it('handles null value in non-set mode', () => {
      expect(() =>
        upsertHelpers.deepMerge(null, ARRAY_MODE.APPEND)(store),
      ).not.toThrow();
    });
  });
});
