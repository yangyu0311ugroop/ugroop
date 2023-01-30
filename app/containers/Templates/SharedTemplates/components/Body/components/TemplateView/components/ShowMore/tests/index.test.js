import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DATASTORE_UTILS } from 'datastore';
import ItemHelper from 'datastore/myTemplateListStore/helpers/item';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'containers/Templates/constants';
import { GET_SHARED_TEMPLATES, NODE_SHARE_API } from 'apis/constants';
import { ShowMore } from '../index';

describe('<ShowMore />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
    isLoading: jest.fn(),
    dispatch: jest.fn(),
    analyse: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history: {
      replace: jest.fn(),
    },
    pageSelected: 'shareToMe',
    pathname: '/sample',
    folderId: 1,
    folder: {
      children: [1, 2],
    },
    sortOrder: 'asc',
    sortField: 'content',
    folderChildren: { 1: { id: 1 }, 2: { id: 2 } },
    location: {
      pathname: '/sample',
    },
  };
  const people = { 1: { knownAs: 'abcd' }, 2: { knownAs: 'edfg' } };

  beforeEach(() => {
    rendered = shallow(<ShowMore {...props} />);
    instance = rendered.instance();
    DATASTORE_UTILS.upsertObject = jest.fn(() => people);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(ShowMore).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should not set offset state if pageCount is less than 0', () => {
      rendered.setProps({
        search: '?page=-1',
      });
      instance.componentDidMount();
      expect(rendered.state().offset).toBe(DEFAULT_OFFSET);
    });
    it('should set offset state based on the page count and DEFAULT LIMIT value', () => {
      rendered.setProps({
        search: '?page=2',
      });
      instance.componentDidMount();
      expect(rendered.state().offset).toBe(2 * DEFAULT_LIMIT);
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should call resaga analyse', () => {
      instance.componentWillReceiveProps({});
    });
  });

  describe('onPaginateSuccess', () => {
    it('should set currResult state based on the number of items in the result.children', () => {
      instance.updateList = jest.fn();
      instance.onPaginateSuccess({ children: { 1: { id: 1 }, 2: { id: 2 } } });
      expect(instance.updateList).toBeCalledWith({
        children: { 1: { id: 1 }, 2: { id: 2 } },
      });
      expect(rendered.state().offset).toBe(DEFAULT_LIMIT);
      expect(resaga.setValue).toBeCalledWith({
        currResultCount: 2,
      });
    });
    it('should set currResult to 0 if result.children', () => {
      instance.updateList = jest.fn();
      instance.onPaginateSuccess({});
      expect(instance.updateList).not.toBeCalled();
      expect(resaga.setValue).toBeCalledWith({
        currResultCount: 0,
      });
    });
  });

  describe('onClick', () => {
    it('should call dispatch action', () => {
      instance.getNextPage = jest.fn(() => 1);
      instance.onPaginateSuccess = jest.fn();
      instance.onClick();
      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_SHARE_API,
        GET_SHARED_TEMPLATES,
        {
          onSuccess: instance.onPaginateSuccess,
          payload: {
            pageSelected: props.pageSelected,
            offset: 1,
            sortOrder: props.sortOrder,
            sortField: props.sortField,
          },
        },
      );
    });
  });

  describe('getNextPage', () => {
    it('should return what is being set state which is the total of state offset value + the default limit', () => {
      const expected = rendered.state().offset + DEFAULT_LIMIT;
      const actual = instance.getNextPage();
      expect(actual).toBe(expected);
    });
  });

  describe('setPageCount', () => {
    it('should set pageCount to 0 if page does not exist', () => {
      instance.setPageCount();
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount to 0 if page is NaN', () => {
      instance.setPageCount(NaN);
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount to 0 if pageCount is less than 0', () => {
      instance.setPageCount(-1);
      expect(instance.pageCount).toBe(0);
    });
    it('should set pageCount depending on the query value', () => {
      instance.setPageCount(2);
      expect(instance.pageCount).toBe(2);
    });
  });

  describe('getPageCount', () => {
    it('should return parsed value of the page query param', () => {
      rendered.setProps({
        search: '?page=5',
      });
      const actual = instance.getPageCount();
      expect(actual).toBe(5);
    });
  });

  describe('updateList', () => {
    const mockResult = {
      id: 1,
      folder: {
        1: {
          children: [3, 4],
        },
      },
      children: { 3: { id: 3 }, 4: { id: 4 } },
    };
    beforeEach(() => {
      ItemHelper.appendPeople = jest.fn(() => 1);
      ItemHelper.appendItem = jest.fn(() => 1);
      ItemHelper.appendChildren = jest.fn(() => 1);
    });
    it('should call resaga.setValue and use itemHelper for folder and children', () => {
      const expected = {
        folder: 1,
        children: 1,
        people,
      };
      instance.updateList(mockResult);
      expect(resaga.setValue).toBeCalledWith(expected);
      expect(ItemHelper.appendItem).toBeCalledWith(
        props.folderId,
        mockResult.folder['1'].children,
      );
      expect(ItemHelper.appendChildren).toBeCalledWith(mockResult.children);
    });
  });

  describe('updateUri', () => {
    it('should call replace function to change url', () => {
      rendered.setProps({
        search: '?view=card',
      });
      instance.pageCount = 0;
      instance.updateUri(1, { view: 'card' });
      expect(props.history.replace).toBeCalledWith(
        `${props.pathname}?view=card&page=1`,
      );
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
