import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FolderListItem } from '../index';

describe('<FolderListItem />', () => {
  let rendered;
  let instance;

  const props = {
    showActions: true,
    checkboxProps: {},
    classes: {},
    isEditable: false,
    id: 1,
    onDelete: jest.fn(),
    onCopy: jest.fn(),
    onMove: jest.fn(),
    onEnableEditMode: jest.fn(),
    canMove: true,
    onUpdate: jest.fn(),
    onEditCancel: jest.fn(),
    memberIdsLength: 1,
    hasNoRootNodeIds: false,
  };

  beforeEach(() => {
    rendered = shallow(<FolderListItem {...props} />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      instance.renderLink = jest.fn(() => 'renderLink');
      instance.renderSubtitle = jest.fn(() => 'renderSubtitle');
      instance.renderDescription = jest.fn(() => 'renderDescription');
      instance.renderSecondColumn = jest.fn(() => 'renderSecondColumn');
      instance.renderActionButtons = jest.fn(() => 'renderActionButtons');

      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should match snapshot if isEditable', () => {
      rendered.setProps({
        isEditable: true,
      });
      const snap = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderActionButtons', () => {
    it('should equal null if showActions is false', () => {
      rendered.setProps({
        showActions: false,
      });
      const snap = shallow(<div>{instance.renderActionButtons()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
