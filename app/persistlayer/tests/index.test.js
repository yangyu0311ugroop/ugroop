/**
 * Created by Yang on 28/2/17.
 */
import localforage from 'localforage';
import {
  localSave,
  getItemLocalStorage,
  removeItemFromLocalStorage,
  getItemLocalForageAsync,
  localForageSaveAsync,
  removeItemFromLocalForageAsync,
  configureLocalForage,
} from '../index';

describe('PersistLayer Test', () => {
  it('should localForageSaveAsync', () => {
    const result = { test: 'test' };
    localSave('test', result);
    const ob = JSON.parse(getItemLocalStorage('test'));
    expect(ob).toEqual(result);
  });
  it('should remove object', () => {
    const result = { test: 'test' };
    localSave('test', result);
    removeItemFromLocalStorage('test');
    expect(localStorage.getItem('test')).toEqual(null);
  });
});
describe('PersistLayer Async Test', () => {
  beforeAll(done => {
    configureLocalForage();
    done();
  });
  beforeEach(done => {
    localforage.setItem('item', JSON.stringify('item')).then(() => {
      done();
    });
  });
  afterEach(() => {
    removeItemFromLocalForageAsync('item');
  });
  it('should get value item async', done => {
    getItemLocalForageAsync('item')
      .then(value => {
        expect(JSON.parse(value)).toBe('item');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  it('should save item2', done => {
    const ITEM2 = 'item2';
    // eslint-disable-next-line
    localForageSaveAsync(ITEM2, ITEM2).then((value)=>{
      localforage.getItem(ITEM2).then(v => {
        expect(JSON.parse(v)).toBe(ITEM2);
        done();
      });
    });
  });
});
