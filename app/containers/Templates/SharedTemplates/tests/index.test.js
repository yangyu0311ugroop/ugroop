/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DEFAULT_SORT_BY, DEFAULT_ORDER } from 'appConstants';
import { SharedTemplates } from '../index';

describe('SharedTemplates', () => {
  const resaga = {
    dispatch: jest.fn(),
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<SharedTemplates resaga={resaga} />);
    instance = rendered.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('<SharedTemplates />', () => {
    it('should exists', () => {
      expect(SharedTemplates).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('componentWillMount', () => {
    it('should initialize the selected page for the shared templates', () => {
      instance.componentWillMount();
      expect(resaga.setValue).toBeCalledWith({
        pageSelected: 'shareToMe',
        currResultCount: 0,
        sortField: DEFAULT_SORT_BY,
        sortOrder: DEFAULT_ORDER,
      });
    });
  });

  describe('componentWillUnmount', () => {
    it('should reset pageSelected, sortOrder, sortField and viewSelected if the user leaves the page', () => {
      instance.componentWillUnmount();
      expect(resaga.setValue).toBeCalledWith({
        pageSelected: null,
        sortOrder: null,
        sortField: null,
        viewSelected: 'card',
        id: null,
        isOpenFolderTree: false,
        folderTreeMode: null,
        selectedId: null,
        selectedType: null,
        selectedName: null,
      });
    });
  });

  describe('render()  ', () => {
    it('should render when showShareToMe true', () => {
      instance.setState({ showShareToMe: true, isLoading: false });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
