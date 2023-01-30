import { FOLDER_FETCH_TYPES } from 'apis/components/Folder/constants';
import {
  FOLDER_API,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
} from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DATASTORE_UTILS } from 'datastore/index';
import { DEFAULT_LIMIT } from 'containers/Templates/constants';
import { MyTemplateShowMore } from '../index';

describe('<MyTemplateShowMore />', () => {
  let rendered;
  let instance;
  const people = { 1: { knownAs: 'abcd' }, 2: { knownAs: 'edfg' } };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
    dispatch: jest.fn(),
    analyse: jest.fn(),
    isLoading: jest.fn(() => true),
  };

  const props = {
    classes: {},
    resaga,
    folderId: 1,
    folder: {
      children: [1, 2],
    },
    history: {
      replace: jest.fn(),
    },
    location: {
      search: '',
      pathname: '',
    },
    sortOrder: 'asc',
    sortField: 'content',
    folderChildren: { 1: { id: 1 }, 2: { id: 2 } },
  };

  const original = {};

  beforeEach(() => {
    rendered = shallow(<MyTemplateShowMore {...props} />);
    instance = rendered.instance();
    DATASTORE_UTILS.upsertObject = jest.fn(() => people);

    original.upsertObject = DATASTORE_UTILS.upsertObject;
    DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
    original.upsertArrayInsideObj = DATASTORE_UTILS.upsertArrayInsideObj;
    DATASTORE_UTILS.upsertArrayInsideObj = jest.fn(
      () => 'upsertArrayInsideObj',
    );

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(MyTemplateShowMore).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onPaginateSuccess()', () => {
    it('should set currResult state based on the number of items in the result.children', () => {
      instance.updateList = jest.fn();
      instance.onPaginateSuccess({ count: 2 });
      expect(rendered.state().offset).toBe(DEFAULT_LIMIT);
      expect(resaga.setValue).toBeCalledWith({
        currResultCount: 2,
      });
      expect(rendered.state().isFetching).toBe(false);
    });
    it('should set currResult to 0 if result.children', () => {
      instance.onPaginateSuccess({ count: 0 });
      expect(resaga.setValue).toBeCalledWith({
        currResultCount: 0,
      });
      expect(rendered.state().isFetching).toBe(false);
    });
  });

  describe('onClick()', () => {
    it('should call dispatch action', () => {
      instance.getNextPage = jest.fn(() => 1);
      instance.onPaginateSuccess = 'onPaginateSuccess';
      instance.onClick();
      expect(resaga.dispatchTo).toBeCalledWith(
        FOLDER_API,
        GET_FOLDER_CHILDREN_WITH_PAGINATION,
        {
          payload: {
            id: props.folderId,
            offset: 1,
            sortOrder: props.sortOrder,
            sortField: props.sortField,
            fetchType: FOLDER_FETCH_TYPES.PAGINATION,
          },
          onSuccess: 'onPaginateSuccess',
        },
      );
      expect(rendered.state().isFetching).toBe(true);
    });
  });

  describe('getNextPage()', () => {
    it('should return what is being set state which is the total of state offset value + the default limit', () => {
      const expected = rendered.state().offset + DEFAULT_LIMIT;
      const actual = instance.getNextPage();
      expect(actual).toBe(expected);
    });
  });

  describe('setPageCount()', () => {
    it('should set pageCount to 0 if page query does not exist', () => {
      instance.setPageCount();
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount to 0 if page is NaN', () => {
      rendered.setProps({
        location: {
          search: '?page=asdasd',
        },
      });
      instance.setPageCount();
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount to 0 if pageCount is less than 0', () => {
      rendered.setProps({
        location: {
          search: '?page=-1',
        },
      });
      instance.setPageCount();
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount depending on the query value', () => {
      rendered.setProps({
        location: {
          search: '?page=2',
        },
      });
      instance.setPageCount();
      expect(instance.pageCount).toBe(2);
    });
  });

  describe('componentDidMount()', () => {
    it('should not call dispatch if pageCount is less than 0', () => {
      rendered.setProps({
        location: {
          search: '?page=-1',
        },
      });
      instance.componentDidMount();
      expect(resaga.dispatchTo).not.toBeCalled();
    });
    it('should call dispatch if pageCount is greater than 0', () => {
      rendered.setProps({
        location: {
          search: '?page=1',
        },
      });
      instance.componentDidMount();
    });
  });

  describe('onFetchMultipleSuccess', () => {
    it('should set isFetching state to false', () => {
      instance.onFetchMultipleSuccess();
      expect(rendered.state().isFetching).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should pass loading true if FETCH_MULTIPLE is true', () => {
      resaga.isLoading.mockReturnValueOnce(false);
      resaga.isLoading.mockReturnValue(true);
      rendered.setProps({
        resaga,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
