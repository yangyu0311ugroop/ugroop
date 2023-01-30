/**
 * Created by Yang on 28/2/17.
 */
import localforage from 'localforage';
export const configureLocalForage = () => {
  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    name: 'myApp',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'localStore', // Should be alphanumeric, with underscores.
    description: 'ugroopLocalStore',
  });
};

export const localSave = (key, jObject) =>
  localStorage.setItem(key, JSON.stringify(jObject));

export const getItemLocalStorage = key => localStorage.getItem(key);

export const removeItemFromLocalStorage = key => localStorage.removeItem(key);

export const localForageSaveAsync = (key, jObject) =>
  localforage.setItem(key, JSON.stringify(jObject)).then(result => result);

export const getItemLocalForageAsync = key => localforage.getItem(key);

export const removeItemFromLocalForageAsync = key =>
  localforage.removeItem(key);
