import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Folder } from '../index';

describe('<Folder />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<Folder {...props} />);
    instance = rendered.instance();
  });

  describe('renderListItemView', () => {
    it('should match snapshot if isEditable', () => {
      rendered.setProps({
        isEditable: true,
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
    it('should return search results', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'content',
        childrenContent: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItemView);
    });
    it('should match snapshot if children have been searched', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'wenk',
        childrenContent: ['content', 'nothere'],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItemView);
    });
    it('should render short description if it exists', () => {
      rendered.setProps({
        shortDescription: 'shortDescription',
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render empty string if short desc doesnt exists', () => {
      rendered.setProps({
        shortDescription: null,
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render null if showActions is false', () => {
      rendered.setProps({
        showActions: false,
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('hasFolders to be equal memberIds.length > 0 && hasNoRootNodeIds === false if first condition is false', () => {
      rendered.setProps({
        parentFolderIds: [1],
        hasNoRootNodeIds: false,
        memberIds: [2, 3],
      });
      const snapshot = shallow(<div>{instance.renderListItemView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardView', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        templateContent: ['1', '3'],
        folderContent: ['1', '3'],
      });
      const snapshot = shallow(<div>{instance.renderCardView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should return null', () => {
      rendered.setProps({
        searchTemplateView: 'here',
        content: 'wenk',
        childrenContent: false,
      });
      expect(instance.renderCardView()).toBe(null);
    });
    it('should match snapshot if children have been searched', () => {
      rendered.setProps({
        searchTemplateView: 'cont',
        content: 'wenk',
        childrenContent: ['content', 'nothere'],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderCardView);
    });
  });

  describe('render', () => {
    it('should return null', () => {
      rendered.setProps({
        content: 'content',
        searchTemplateView: 'nothingHere',
      });
      expect(instance.render()).toBe(null);
    });
    it('should not return null', () => {
      rendered.setProps({
        content: 'contentIsHere',
        searchTemplateView: 'content',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
