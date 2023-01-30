/**
 * Created by paulcedrick on 6/15/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { DATASTORE_UTILS } from 'datastore';
import {
  FOLDER_API,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
} from 'apis/constants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NodeExplorer } from '../index';

describe('<NodeExplorer /> container', () => {
  let rendered;
  let instance;

  const router = {
    location: {
      pathname: '/sample',
      search: 'a=1',
      query: {},
    },
    params: {},
    history: {
      push: jest.fn(),
      replace: jest.fn(),
    },
  };

  const resaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    isLoading: jest.fn(),
  };

  const props = {
    ...router,
    folderChildren: [{ id: 1 }, { id: 2 }, { id: 3 }],
    resaga,
  };

  const people = { 1: { knownAs: 'abcd' }, 2: { knownAs: 'edfg' } };
  beforeEach(() => {
    rendered = shallow(<NodeExplorer {...props} />);
    instance = rendered.instance();
    DATASTORE_UTILS.upsertObject = jest.fn(() => people);
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(NodeExplorer).toBeDefined();
  });
  it('should display what it should display if loadingState is false and query.current', () => {
    const wrapper = shallow(<NodeExplorer {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call fetchTemplates function', () => {
      const mockFetchTemplates = jest.fn();
      rendered.setProps({
        location: {
          search: undefined,
        },
      });
      instance.onFetchTemplates = mockFetchTemplates;
      instance.componentDidMount();
      expect(mockFetchTemplates).toBeCalled();
    });
    it('should call fetchTemplates with parameter depending on the location search param', () => {
      const mockLocation = {
        search: 'current=367',
      };
      const mockFetchTemplates = jest.fn();
      instance.onFetchTemplates = mockFetchTemplates;
      rendered.setProps({
        location: mockLocation,
      });
      instance.componentDidMount();

      const expectedArgs = '367';
      expect(mockFetchTemplates).toBeCalledWith(expectedArgs);
    });
    it('should call setValue with particular object shape', () => {
      const mockLocation = {
        search: 'current=367',
      };
      const mockFetchTemplates = jest.fn();
      instance.onFetchTemplates = mockFetchTemplates;
      rendered.setProps({
        location: mockLocation,
      });
      instance.componentDidMount();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should call fetchTemplates if current query is changed', () => {
      const mockFetchTemplates = jest.fn();
      instance.onFetchTemplates = mockFetchTemplates;
      rendered.setProps({
        location: {
          search: 'current=1',
        },
      });
      expect(mockFetchTemplates).toBeCalled();
    });
    it('should not call fetchTemplates if current query is not changed', () => {
      const mockFetchTemplates = jest.fn();
      instance.onFetchTemplates = mockFetchTemplates;
      rendered.setProps({
        location: {
          query: {},
        },
      });
      expect(mockFetchTemplates).not.toBeCalled();
    });

    it('should call setValue', () => {
      rendered.setProps({
        organisationId: 2233,
        location: {},
      });

      instance.componentWillReceiveProps({
        organisationId: 3344,
        location: {},
      });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('componentWillUnmount', () => {
    it('should set value of sortOrder and sortField to default when leaving the page', () => {
      instance.componentWillUnmount();
      expect(resaga.setValue).toBeCalledWith({
        sortOrder: '',
        sortField: '',
        layout: '',
        isAddTemplateModalOpen: false,
        folderFormOpen: false,
      });
    });
  });

  describe('onFetchTemplates()', () => {
    const sort = { sortField: 'content', sortOrder: 'asc' };
    beforeEach(() => {
      instance.getSortValue = jest.fn(() => sort);
      instance.onFetchTemplateSuccess = 'onFetchTemplateSuccess';
      instance.onFetchTemplateError = 'onFetchTemplateError';
    });
    it('should call dispatch', () => {
      instance.onFetchTemplates(1);
      expect(resaga.dispatchTo).toBeCalledWith(
        FOLDER_API,
        GET_FOLDER_CHILDREN_WITH_PAGINATION,
        {
          payload: { id: 1, ...sort },
          onSuccess: 'onFetchTemplateSuccess',
          onError: 'onFetchTemplateError',
        },
      );
    });
    it('should pass null if id is not existing', () => {
      instance.onFetchTemplates();
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('should setValue of folderFormOpen to false', () => {
      instance.onFetchTemplates();
      expect(resaga.setValue).toBeCalledWith({ folderFormOpen: false });
    });
  });

  describe('onFetchTemplateSuccess()', () => {
    const mockParam = {
      nodeId: 1,
      folder: {},
      count: 3,
    };
    const mockSort = {
      sortOrder: 'asc',
      sortField: 'content',
    };

    it('should call setValue when onFetchSuccess is called', () => {
      instance.onFetchTemplateSuccess(mockParam, mockSort);
      expect(resaga.setValue).toBeCalledWith({
        currResultCount: 3,
        isFetchingInitialContent: false,
        id: 1,
      });
    });
  });

  describe('onFetchError', () => {
    it('should set value id to 0', () => {
      instance.onFetchTemplateError();
      expect(resaga.setValue).toBeCalledWith({
        id: 0,
      });
    });
  });

  describe('isSortReduxValExist()', () => {
    it('should return false if either sortField or sortOrder is blank', () => {
      rendered.setProps({
        sortField: '',
        sortOrder: 'desc',
      });
      expect(instance.isSortReduxValExist()).toBe(false);

      rendered.setProps({
        sortField: 'content',
        sortOrder: '',
      });
      expect(instance.isSortReduxValExist()).toBe(false);
    });
    it('should return true if both sortField and sortOrder have value', () => {
      rendered.setProps({
        sortField: 'content',
        sortOrder: 'asc',
      });
      expect(instance.isSortReduxValExist()).toBe(true);
    });
  });

  describe('isSortQueryExist()', () => {
    it('should return false if sortField or sortOrder does not exist in query param', () => {
      const fieldExist = instance.isSortQueryExist({ sortField: 'content' });
      expect(fieldExist).toBe(false);

      const orderExist = instance.isSortQueryExist({ sortOrder: 'asc' });
      expect(orderExist).toBe(false);
    });
    it('should return true if sortField and sortOrder value exist', () => {
      const actual = instance.isSortQueryExist({
        sortField: 'content',
        sortOrder: 'asc',
      });
      expect(actual).toBe(true);
    });
  });

  describe('getSortValue()', () => {
    it('should return default (sort field as content and sort order as ascending)', () => {
      const sort = instance.getSortValue();
      expect(sort).toEqual({
        sortField: 'createdAt',
        sortOrder: 'desc',
      });
    });
    it('should return value from the props sortOrder and sorField if props value exist', () => {
      rendered.setProps({
        sortOrder: 'desc',
        sortField: 'createdBy',
      });
      const sort = instance.getSortValue();
      expect(sort).toEqual({
        sortField: 'createdBy',
        sortOrder: 'desc',
      });
    });
    it('should return value form query param if sort order and sort field props are both empty', () => {
      rendered.setProps({
        location: {
          search: 'sortField=lastModifiedBy&sortOrder=desc',
        },
      });
      const sort = instance.getSortValue();
      expect(sort).toEqual({
        sortField: 'lastModifiedBy',
        sortOrder: 'desc',
      });
    });
  });

  describe('onInitSortQuery()', () => {
    it('should set value of resaga sortOrder and sortField if isSortQueryExist and redux value does not exist', () => {
      instance.onInitSortQuery({ sortOrder: 'desc', sortField: 'createdBy' });
      resaga.setValue({
        sortOrder: 'desc',
        sortField: 'createdBy',
      });
    });
    it('should set value of query param from the redux value if redux value exist and query param does not exist', () => {
      rendered.setProps({
        sortOrder: 'desc',
        sortField: 'createdBy',
        location: {
          pathname: 'sample',
        },
      });
      instance.onInitSortQuery({});
      expect(props.history.replace).toBeCalledWith(
        'sample?sortOrder=desc&sortField=createdBy',
      );
    });
    it('should set value resaga value based on the query param value if both redux and query param values for sortOrder and sortField are available', () => {
      rendered.setProps({
        sortOrder: 'desc',
        sortField: 'content',
      });
      instance.onInitSortQuery({ sortOrder: 'desc', sortField: 'content' });
      expect(resaga.setValue).toBeCalledWith({
        sortOrder: 'desc',
        sortField: 'content',
      });
    });
    it('should set value of resaga and query param according to the default value', () => {
      rendered.setProps({
        sortOrder: '',
        sortField: '',
      });
      instance.onInitSortQuery({});
      expect(resaga.setValue).toBeCalledWith({
        sortOrder: 'desc',
        sortField: 'createdAt',
      });
    });
  });

  describe('renderHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ showHeader: false });

      expect(instance.renderHeader()).toBe(null);
    });

    it('should renderHeader', () => {
      rendered.setProps({ showHeader: true });

      const snapshot = shallow(<div>{instance.renderHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBreadcrumbs()', () => {
    it('should return null', () => {
      rendered.setProps({ showBreadcrumbs: false });

      expect(instance.renderBreadcrumbs()).toBe(null);
    });

    it('should renderBreadcrumbs', () => {
      rendered.setProps({ showBreadcrumbs: true });

      const snapshot = shallow(<div>{instance.renderBreadcrumbs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
