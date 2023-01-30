import { FOLDER_API, GET_PARENT_OF_FOLDER } from 'apis/constants';
import { SHARED_TOURS, URL_HELPERS } from 'appConstants';
import { FOLDER_NAME } from 'containers/Templates/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { BreadcrumbContainer } from '../index';

describe('<BreadcrumbContainer />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const location = {
    search: 'Truth',
  };

  const props = {
    classes: {},
    resaga,
    location,
    folderId: 0,
    rootUrl: '/jesus',
    itemsUrl: '/soul',
  };

  beforeEach(() => {
    rendered = shallow(<BreadcrumbContainer {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(BreadcrumbContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchParents and pass the query string', () => {
      instance.fetchParents = jest.fn();
      rendered.setProps({
        location: {
          search: '?current=7',
        },
      });
      instance.componentDidMount();
      expect(instance.fetchParents).toBeCalledWith('7');
    });

    it('should call fetchParents and pass folderId if folderId is not 0', () => {
      instance.fetchParents = jest.fn();
      rendered.setProps({
        folderId: 7,
      });
      instance.componentDidMount();
      expect(instance.fetchParents).toBeCalledWith(7);
    });

    it('should not call fetchParents if no query string and folderId is 0', () => {
      instance.fetchParents = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchParents).not.toBeCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should call fetchParents and update state if folderId is not 0 and folderId is not the same as previous one', () => {
      instance.fetchParents = jest.fn();
      rendered.setState({
        error: true,
        breadcrumbItems: [1, 2, 3],
      });
      rendered.setProps({
        folderId: 2,
      });
      expect(instance.fetchParents).toBeCalledWith(2);
      expect(rendered.state()).toMatchSnapshot();
    });
  });

  describe('onUpdate', () => {
    it('should update state with new items', () => {
      rendered.setProps({
        items: [1, 2, 3],
      });
      instance.onUpdate(0)({
        parentId: -1,
        name: FOLDER_NAME.MY_TOURS,
        id: 1,
      });
      instance.onUpdate(1)({
        parentId: 1,
        name: 'folder1',
        id: 2,
      });
      instance.onUpdate(2)({
        parentId: 1,
        name: 'folder2',
        id: 3,
      });
      expect(rendered.state()).toMatchSnapshot();
    });

    it('should name first item with my tours if its name is null', () => {
      rendered.setProps({
        items: [1, 2, 3],
      });
      instance.onUpdate(0)({
        parentId: -1,
        name: null,
        id: 1,
      });
      instance.onUpdate(1)({
        parentId: 1,
        name: 'folder1',
        id: 2,
      });
      instance.onUpdate(2)({
        parentId: 1,
        name: 'folder2',
        id: 3,
      });
      expect(rendered.state()).toMatchSnapshot();
    });

    it('should name first item with just blank if folder name is blank', () => {
      rendered.setProps({
        items: [1, 2, 3],
      });
      instance.onUpdate(0)({
        parentId: -1,
        name: '',
        id: 1,
      });
      instance.onUpdate(1)({
        parentId: 1,
        name: 'folder1',
        id: 2,
      });
      instance.onUpdate(2)({
        parentId: 1,
        name: 'folder2',
        id: 3,
      });
      expect(rendered.state()).toMatchSnapshot();
    });

    it('should update state with new items with particular baseUrl if root name is org tours', () => {
      rendered.setProps({
        items: [1, 2, 3],
      });
      instance.onUpdate(0)({
        parentId: -1,
        name: FOLDER_NAME.ORG_TOURS,
        id: 1,
      });
      instance.onUpdate(1)({
        parentId: 1,
        name: 'folder1',
        id: 2,
      });
      instance.onUpdate(2)({
        parentId: 1,
        name: 'folder2',
        id: 3,
      });
      expect(rendered.state()).toMatchSnapshot();
    });
    it('should call forceUpdate if it is last item', () => {
      instance.forceUpdate = jest.fn();
      rendered.setProps({
        items: [1, 2, 3],
      });
      instance.onUpdate(2)({
        parentId: 1,
        name: 'Me',
        id: 3,
      });
      expect(rendered.state()).toMatchSnapshot();
      expect(instance.forceUpdate).toBeCalled();
    });
  });

  describe('onError', () => {
    it('should set error state to true', () => {
      rendered.setState({
        error: false,
      });
      instance.onError();
      expect(rendered.state().error).toBe(true);
    });
  });

  describe('fetchParents', () => {
    it('should call dispatchTo', () => {
      instance.fetchParents(7);
      expect(resaga.dispatchTo).toBeCalledWith(
        FOLDER_API,
        GET_PARENT_OF_FOLDER,
        {
          payload: 7,
          onError: instance.onError,
        },
      );
      expect(rendered.state().breadcrumbItems).toEqual([]);
      expect(rendered.state().error).toBe(false);
    });
  });

  describe('shouldDisplayOnlyRootItem', () => {
    it('should return true if location search folder param is shared', () => {
      rendered.setState({
        breadcrumbItems: [
          {
            label: FOLDER_NAME.SHARED_TOURS,
          },
        ],
      });
      expect(instance.shouldDisplayOnlyRootItem()).toBe(true);
    });
    it('should return false if location search folder param is not shared', () => {
      rendered.setState({
        breadcrumbItems: [
          {
            label: FOLDER_NAME.MY_TOURS,
          },
        ],
      });
      expect(instance.shouldDisplayOnlyRootItem()).toBe(false);
    });
  });

  describe('getItemUrl', () => {
    it('should return base url without query', () => {
      instance.baseUrl = '/sample';
      const result = instance.getItemUrl(1, 0);
      expect(result).toBe('/sample');
    });

    it('should return base url with query', () => {
      instance.baseUrl = '/sample';
      const result = instance.getItemUrl(2, 1);
      expect(result).toBe('/sample?current=2');
    });
  });

  describe('setBaseUrl', () => {
    it('should set baseUrl to org tours if the id passed is equal to orgRootNodeId', () => {
      instance.getOrgId = jest.fn(() => 1);
      instance.setBaseUrl();
      expect(instance.baseUrl).toBe(URL_HELPERS.orgTours(1));
    });

    it('should set baseUrl to personal tours if the id passed is equal to rootNodeId', () => {
      instance.getOrgId = jest.fn(() => 1);
      rendered.setProps({
        rootNodeId: 1,
      });
      instance.setBaseUrl({ id: 1 });
      expect(instance.baseUrl).toBe(URL_HELPERS.tours());
    });

    it('should set baseUrl to shared tours if the name is Shared Tours', () => {
      instance.getOrgId = jest.fn();
      instance.setBaseUrl({ name: SHARED_TOURS });
      expect(instance.baseUrl).toBe(URL_HELPERS.sharedTours());
    });
  });

  describe('renderText()', () => {
    it('should renderText', () => {
      const snapshot = shallow(
        <div>{instance.renderText({ id: 2233, label: 'something' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return the label passed to it if label is for shared tours', () => {
      const result = instance.renderText({ label: FOLDER_NAME.SHARED_TOURS });

      expect(result).toEqual(FOLDER_NAME.SHARED_TOURS);
    });

    it('should org name if id passed to it is equal to orgRootNodeId', () => {
      rendered.setProps({
        orgRootNodeId: 1,
      });
      const result = instance.renderText({
        label: FOLDER_NAME.ORG_TOURS,
        id: 1,
      });

      expect(result).toMatchSnapshot();
    });
  });

  describe('renderItem', () => {
    it('should pass -1 if id is undefined', () => {
      const snap = shallow(<div>{instance.renderItem(undefined, 0)}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render loading if fetch parents is loading', () => {
      rendered.setProps({
        isFetchParentsLoading: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
