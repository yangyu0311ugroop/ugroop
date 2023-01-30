import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { Footer } from '../index';

import styles from '../styles';

const mockStyles = mockStylesheet('FolderCardContent', styles);

describe('<Footer />', () => {
  let rendered;
  let instance;

  const props = {
    classes: mockStyles,
    tourCount: 1,
    subfolderCount: 1,
    actions: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Footer {...props} />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        actions: jest.fn(),
      });
      instance.renderFooterContent = jest.fn(() => 'renderFooterContent');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderFooterContent', () => {
    it('should render empty if there are no tours and subfolders', () => {
      rendered.setProps({
        tourCount: 0,
        subfolderCount: 0,
      });
      instance.renderEmptyFolderInfo = jest.fn(() => 'renderEmptyFolderInfo');
      expect(instance.renderFooterContent()).toEqual('renderEmptyFolderInfo');
    });

    it('should match snapshot if there are tours and subfolders', () => {
      instance.renderFolderText = jest.fn(() => 'renderFolderText');
      instance.renderDot = jest.fn(() => 'renderDot');
      instance.renderTourText = jest.fn(() => 'renderTourText');

      const snapshot = shallow(<div>{instance.renderFooterContent()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDot', () => {
    it('should return empty string if there is no tourcount and subfoldercount', () => {
      rendered.setProps({
        subfolderCount: 0,
        tourCount: 0,
      });
      expect(instance.renderDot()).toEqual('');
    });
    it('should match snapshot if there is subfolder count and tour count', () => {
      rendered.setProps({
        subfolderCount: 1,
        tourCount: 1,
      });
      const snapshot = shallow(<div>{instance.renderDot()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTourText', () => {
    it('should return empty string if there is no tourcount', () => {
      rendered.setProps({
        tourCount: 0,
      });
      expect(instance.renderTourText()).toEqual('');
    });
    it('should match snapshot if there is tour count', () => {
      rendered.setProps({
        tourCount: 1,
      });
      const snapshot = shallow(<div>{instance.renderTourText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFolderText', () => {
    it('should return empty string if there is no subfoldercount', () => {
      rendered.setProps({
        subfolderCount: 0,
      });
      expect(instance.renderFolderText()).toEqual('');
    });
    it('should match snapshot if there is subfolder count', () => {
      rendered.setProps({
        subfolderCount: 1,
      });
      const snapshot = shallow(<div>{instance.renderFolderText()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
