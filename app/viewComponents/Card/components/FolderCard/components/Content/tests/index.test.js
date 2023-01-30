import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import {
  FolderContent,
  subFolderViewDef,
  tourViewDef,
  makeViewDelegate,
} from '../index';

import styles from '../styles';

const mockStyles = mockStylesheet('FolderCardContent', styles);

describe('<FolderContent />', () => {
  let rendered;
  let instance;

  const props = {
    classes: mockStyles,
    itemBaseUrl: '/sample',
    templateQueryParam: 'templateQueryParam',
    templateIds: [1],
    folderIds: [2],
    tourContent: ['tour'],
    folderContent: ['folder'],
  };

  beforeEach(() => {
    rendered = shallow(<FolderContent {...props} />);
    instance = rendered.instance();
  });

  describe('tourViewDef', () => {
    it('should return a component given the passed parameter', () => {
      const result = tourViewDef(
        { content: 'Jesus is the King of kings!' },
        2,
        3,
        'queryParam',
      );
      const snapshot = shallow(result);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('subFolderViewDef', () => {
    it('should return a component given the passed parameter', () => {
      const result = subFolderViewDef(
        { content: 'God is holy, holy, holy' },
        3,
        4,
        '/sample',
      );
      const snapshot = shallow(result);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('makeViewDelegate', () => {
    const elem = [
      {
        content:
          'You can only be saved in your sin by turning away from your sin and believing in Jesus',
      },
    ];
    it('should return an object containing numberOfRow and itemCellView', () => {
      const result = makeViewDelegate(jest.fn(), elem, 'args');
      expect(result.numberOfRow).toBeDefined();
      expect(result.itemCellView).toBeDefined();
    });

    describe('numberOfRow', () => {
      it('should return the length of coll', () => {
        const result = makeViewDelegate(jest.fn(), elem, [1], 'args');
        expect(result.numberOfRow()).toBe(elem.length);
      });
    });

    describe('itemCellView', () => {
      it('should call the viewDef param and pass params', () => {
        const viewDefMock = jest.fn();
        const result = makeViewDelegate(viewDefMock, elem, [1], 'args');
        result.itemCellView(0);
        expect(viewDefMock).toBeCalled();
      });
    });
  });

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderContent()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmptyContent', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEmptyContent()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    beforeEach(() => {
      instance.renderEmptyContent = jest.fn(() => 'renderEmptyContent');
      instance.renderContent = jest.fn(() => 'renderContent');
    });

    it('should render empty content if there are no folderIds and templateIds', () => {
      rendered.setProps({
        folderIds: [],
        templateIds: [],
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
