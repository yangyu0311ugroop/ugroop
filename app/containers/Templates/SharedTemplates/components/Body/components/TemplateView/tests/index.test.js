import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_SHARE_API, GET_SHARED_TEMPLATES } from 'apis/constants';
import { TemplateView } from '../index';

describe('<TemplateView />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history: {
      replace: jest.fn(),
    },
    pageSelected: 'shareByMe',
    pathname: '/sample',
    location: {
      pathname: '/sample',
    },
  };

  const people = { 1: { knownAs: 'abcd' }, 2: { knownAs: 'edfg' } };

  beforeEach(() => {
    rendered = shallow(<TemplateView {...props} />);
    instance = rendered.instance();
    DATASTORE_UTILS.upsertObject = jest.fn(() => people);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(TemplateView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should not render loading if state isFetching is false', () => {
    rendered.setState({
      isFetching: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something based on view and items is > 0', () => {
    rendered.setState({
      isFetching: false,
    });
    rendered.setProps({
      view: 'list',
    });
    rendered.setProps({
      folderChildrenArray: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
  });

  it('should render something based on view and items is > 0', () => {
    rendered.setState({
      isFetching: false,
    });
    rendered.setProps({
      view: 'card',
    });
    rendered.setProps({
      folderChildrenArray: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
  });

  describe('componentDidMount', () => {
    it('should get sortValue and call dispatchTo', () => {
      rendered.setState({
        isFetching: false,
      });
      rendered.setProps({
        pageSelected: 'byMe',
      });
      instance.getSortValue = jest.fn(() => ({
        sortOrder: 'desc',
        sortField: 'content',
      }));
      instance.onFetchSuccess = jest.fn(() => 4);
      instance.componentDidMount();
      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_SHARE_API,
        GET_SHARED_TEMPLATES,
        {
          payload: {
            pageSelected: 'byMe',
            sortOrder: 'desc',
            sortField: 'content',
            offset: 0,
            page: 0,
          },
          onSuccess: 4,
        },
      );
    });
  });

  describe('onSortChange', () => {
    it('should pass page in the query if existing and call dispatchTo', () => {
      rendered.setProps({
        search: 'page=7',
      });
      instance.onSortFetchSuccess = 'function';
      instance.onSortChange('asc', 'content');
      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_SHARE_API,
        GET_SHARED_TEMPLATES,
        {
          payload: {
            offset: 0,
            sortOrder: 'asc',
            sortField: 'content',
            page: 7,
            pageSelected: props.pageSelected,
          },
          onSuccess: 'function',
        },
      );
    });
    it('should pass asc if sortField is different than the one passed in the function', () => {
      rendered.setProps({
        search: '',
        sortField: 'createdBy',
      });
      instance.onSortFetchSuccess = 'function';
      instance.onSortChange('desc', 'something');
      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_SHARE_API,
        GET_SHARED_TEMPLATES,
        {
          payload: {
            offset: 0,
            sortOrder: 'asc',
            sortField: 'something',
            page: 0,
            pageSelected: props.pageSelected,
          },
          onSuccess: 'function',
        },
      );
    });
    it('should pass whatever is being passed in function if sortField and the props sortField is same', () => {
      rendered.setProps({
        search: '',
      });
      rendered.setProps({
        sortField: 'qweqwe',
      });
      instance.onSortFetchSuccess = 'function';
      instance.onSortChange('desc', 'qweqwe');
      expect(resaga.dispatchTo).toBeCalledWith(
        NODE_SHARE_API,
        GET_SHARED_TEMPLATES,
        {
          payload: {
            offset: 0,
            sortOrder: 'desc',
            sortField: 'qweqwe',
            page: 0,
            pageSelected: props.pageSelected,
          },
          onSuccess: 'function',
        },
      );
    });
  });

  describe('onSortFetchSuccess', () => {
    it('should set value of id, folders and children', () => {
      const resultMock = {
        id: 1,
        folder: { 1: { id: 1 } },
        children: { 2: { id: 2 } },
      };
      rendered.setProps({
        sortField: 'content',
        sortOrder: 'desc',
      });
      instance.onSortFetchSuccess(resultMock, {
        sortField: 'content',
        sortOrder: 'desc',
      });
      expect(resaga.setValue).toBeCalledWith({
        id: resultMock.id,
        folder: resultMock.folder,
        children: resultMock.children,
        sortField: 'content',
        sortOrder: 'desc',
        people,
      });
    });
    it('should set value of id, folders, children and reset order to asc if it is a new tab selected', () => {
      const resultMock = {
        id: 1,
        folder: { 1: { id: 1 } },
        children: { 2: { id: 2 } },
      };
      rendered.setProps({
        sortField: 'content',
        sortOrder: 'desc',
      });
      instance.onSortFetchSuccess(resultMock, {
        sortField: 'lastModifiedBy',
        sortOrder: 'asc',
      });
      expect(resaga.setValue).toBeCalledWith({
        id: resultMock.id,
        folder: resultMock.folder,
        children: resultMock.children,
        sortField: 'lastModifiedBy',
        sortOrder: 'asc',
        people,
      });
    });
  });

  describe('onSortChangeQuery', () => {
    it('should update the url with the value of sort order and sort field', () => {
      rendered.setProps({
        search: '',
      });
      instance.onSortChangeQuery('content', 'desc');
      expect(props.history.replace).toBeCalledWith(
        `${props.pathname}?sortOrder=desc&sortField=content`,
      );
    });
  });

  describe('onInitSortQuery', () => {
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
        pathname: 'sample',
      });
      instance.onInitSortQuery({});
      expect(props.history.replace).toBeCalledWith(
        '/sample?sortOrder=desc&sortField=createdBy',
      );
    });
    it('should set value resaga value based on the query param value if both redux and query param values for sortOrder and sortField are available', () => {
      rendered.setProps({
        sortOrder: 'asc',
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
        sortOrder: 'asc',
        sortField: 'content',
      });
    });
  });

  describe('onFetchSuccess', () => {
    it('should set isFetching state to false and set resaga value', () => {
      instance.onFetchSuccess('content', 'desc')({
        id: 'sharedTours',
        folder: { sharedTours: { children: [1, 2, 3] } },
        children: { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } },
      });
      expect(rendered.state().isFetching).toBe(false);
      expect(resaga.setValue).toBeCalledWith({
        id: 'sharedTours',
        folder: { sharedTours: { children: [1, 2, 3] } },
        children: { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } },
        sortField: 'content',
        sortOrder: 'desc',
        currResultCount: 3,
        people,
      });
    });
    it('should make currResultCount to 0 if result.children does not exist', () => {
      instance.onFetchSuccess('content', 'desc')({
        id: 'sharedTours',
        folder: { sharedTours: { children: [1, 2, 3] } },
      });
      expect(rendered.state().isFetching).toBe(false);
      expect(resaga.setValue).toBeCalledWith({
        id: 'sharedTours',
        folder: { sharedTours: { children: [1, 2, 3] } },
        children: undefined,
        sortField: 'content',
        sortOrder: 'desc',
        currResultCount: 0,
        people,
      });
    });
  });

  describe('getSortValue', () => {
    it('should return default (sort field as content and sort order as ascending)', () => {
      const sort = instance.getSortValue();
      expect(sort).toEqual({
        sortField: 'content',
        sortOrder: 'asc',
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
        search: 'sortField=lastModifiedBy&sortOrder=desc',
      });
      const sort = instance.getSortValue();
      expect(sort).toEqual({
        sortField: 'lastModifiedBy',
        sortOrder: 'desc',
      });
    });
  });

  describe('isSortReduxValExist', () => {
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

  describe('isSortQueryExist', () => {
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

  describe('renderBlankslate()', () => {
    it('sharedByOthers', () => {
      rendered.setProps({ pageSelected: 'sharedByOthers' });
      const snapshot = shallow(<div>{instance.renderBlankslate()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderActions', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderActions({ id: 1 })}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if pageSelected is shareByOthers', () => {
      rendered.setProps({ pageSelected: 'sharedByOthers' });
      const snapshot = shallow(<div>{instance.renderActions({ id: 1 })}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
