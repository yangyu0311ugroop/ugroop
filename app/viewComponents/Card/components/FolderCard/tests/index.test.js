import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import styles from '../styles';
import { FolderCard } from '../index';

const mockStyle = mockStylesheet('TemplateCard', styles);

describe('<FolderCard />', () => {
  let rendered;
  let instance;

  const props = {
    content: 'Folder Parent',
    id: 1,
    baseUrl: 'baseUrl',
    isLoading: false,
    rootClassName: 'rootClassName',
    cardImageUrl: 'cardImageUrl',
    showActions: true,
    onEditSubmit: jest.fn(),
    onEditCancel: jest.fn(),
    isEditable: false,
    renderActions: jest.fn(),
    templateQueryParam: 'templateQueryParam',
    folderCount: 1,
    tourCount: 1,
    templateIds: [2],
    folderIds: [3],
    tourContent: ['tour'],
    folderContent: ['folder'],
    classes: mockStyle,
  };

  beforeEach(() => {
    rendered = shallow(<FolderCard {...props} />);
    instance = rendered.instance();
  });

  describe('renderLoading', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLoading()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOverflow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderOverflow()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCard', () => {
    beforeEach(() => {
      instance.renderLoading = jest.fn(() => 'renderLoading');
      instance.renderOverflow = jest.fn(() => 'renderOverflow');
    });

    it('should renderActions if showActions is true', () => {
      rendered.setProps({
        renderActions: jest.fn(),
      });

      const snapshot = shallow(<div>{instance.renderCard()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not renderActions if showActions is false', () => {
      rendered.setProps({
        showActions: false,
        renderActions: jest.fn(),
      });

      const snapshot = shallow(<div>{instance.renderCard()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderLoading and renderOverflow if isLoading is true', () => {
      rendered.setProps({
        isLoading: true,
      });
      const snapshot = shallow(<div>{instance.renderCard()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    beforeEach(() => {
      instance.renderCard = jest.fn(() => 'renderCard');
    });
    it('should render card if isEditable is false', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
