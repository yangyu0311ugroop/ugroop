import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { FolderCardItem } from '../index';

describe('FolderCardItem', () => {
  let rendered;
  let instance;

  const props = {
    folderIds: [1],
    templateIds: [2],
    templateContent: ['tour'],
    folderContent: ['folder'],
    onMove: jest.fn(),
    onCopy: jest.fn(),
    onEnableEditMode: jest.fn(),
    onDelete: jest.fn(),
    parentFolderIdsLength: 1,
    memberIdsLength: 1,
    hasNoRootNodeIds: false,
  };

  beforeEach(() => {
    rendered = shallow(<FolderCardItem {...props} />);
    instance = rendered.instance();
  });

  describe('renderActions', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.renderActions()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
