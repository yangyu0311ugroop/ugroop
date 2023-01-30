import toJSON from 'enzyme-to-json';
import util from 'containers/Templates/Components/GridView/util';
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Template } from '../index';

describe('<Template />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    isSharedTours: null,
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Template classes={{}} resaga={resaga} />);
    instance = rendered.instance();
    util.dispatch = jest.fn();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Template).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDoubleCard()', () => {
    it('should renderDoubleCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDoubleCard);
    });
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCard);
    });
  });

  describe('renderLine()', () => {
    it('should renderLine', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLine);
    });
  });

  describe('renderCompressed()', () => {
    it('should renderCompressed', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCompressed);
    });
  });

  describe('renderSimpleView()', () => {
    it('should renderSimpleView', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSimpleView);
    });
  });

  describe('render()', () => {
    it('should filter by search, no content', () => {
      rendered.setProps({ search: 'search', content: '', shouldFilter: true });

      expect(instance.render()).toBe(null);
    });

    it('should return null', () => {
      rendered.setProps({
        searchTemplateView: 'content',
        content: 'nothere',
      });
      expect(instance.render()).toBe(null);
    });

    it('should not return null', () => {
      rendered.setProps({
        searchTemplateView: 'not',
        content: 'nothere',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should filter by search, content no match', () => {
      rendered.setProps({
        search: 'search',
        content: 'no match',
        shouldFilter: true,
      });

      expect(instance.render()).toBe(null);
    });

    it('should return LOGIC_HELPERS.switchCase', () => {
      rendered.setProps({
        search: 'search',
        content: 'SEARCH',
        shouldFilter: true,
      });
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
    });

    it('should return render prop', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      expect(instance.render()).toBe('children');
    });
  });

  describe('renderCardView', () => {
    it('should match snapshot if isSharedTours is not empty', () => {
      rendered.setProps({
        isSharedTours: 'shared',
      });
      const snap = shallow(<div>{instance.renderCardView()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should return null', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'nothere',
      });
      expect(instance.renderCardView()).toBe(null);
    });
    it('should show search result', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'content',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderCardView);
    });
    it('should match snapshot is isSharedTours', () => {
      rendered.setProps({
        isSharedTours: null,
      });
      const snap = shallow(<div>{instance.renderCardView()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderListItemView', () => {
    it('should render shortDescription', () => {
      rendered.setProps({
        shortDescription: 'shortDescription',
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should return null', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'nothere',
      });
      expect(instance.renderListItemView()).toBe(null);
    });
    it('should not return null and should show search results', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'content',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItemView);
    });
    it('should check hasFolders if hasNoRootNodeIds is false', () => {
      rendered.setProps({
        hasNoRootNodeIds: false,
        parentFolderIds: false,
        memberIds: [1],
        showActions: false,
        isSharedTours: 'shared',
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
