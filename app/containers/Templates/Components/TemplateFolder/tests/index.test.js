import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import stylesheet from '../styles';
import { UGTemplateFolder } from '../index';
import util from '../../GridView/util';

describe('UGTemplateFolder ', () => {
  let rendered;
  let instance;
  let tempDispatchTo;
  let resaga;
  let resagaValues;

  const mockStyle = mockStylesheet('TemplateFolder', stylesheet, theme);

  const props = {
    id: 3,
    classes: mockStyle,
    onEnableEdit: jest.fn(),
    onEditSubmit: jest.fn(),
    onEditCancel: jest.fn(),
    onCopy: jest.fn(),
    onDelete: jest.fn(),
    onMove: jest.fn(),
  };

  beforeEach(() => {
    tempDispatchTo = util.dispatch;
    util.dispatch = jest.fn();

    resagaValues = {};

    resaga = {
      setValue: obj => {
        resagaValues = { ...resagaValues, ...obj };
      },
    };

    rendered = shallow(<UGTemplateFolder resaga={resaga} {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  afterEach(() => {
    util.dispatch = tempDispatchTo;
  });

  it('should exist ', () => {
    expect(UGTemplateFolder).toBeDefined();
  });

  it('should render without exploding ', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount ', () => {
    it('should be called properly if cardImageUrl does not exist', () => {
      instance.componentDidMount();
      expect(util.dispatch).toBeCalled();
      expect(util.dispatch.mock.calls).toMatchSnapshot();
    });

    it('should be called properly if cardImageUrl exists', () => {
      rendered.setProps({ cardImageUrl: '/some/image.jpg' });
      instance.componentDidMount();
      expect(util.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('getFolderImageSuccess', () => {
    let result;
    let funcResult;

    it('should be called properly (1)', () => {
      rendered.setProps({ id: 123 });
      result = { id: 2, imageUrl: '/some/url/of/image.jpg' };

      instance.getFolderImageSuccess(result);
      funcResult = resagaValues.cardImageList();

      expect(funcResult).toEqual({ 123: '/some/url/of/image.jpg' });
    });

    it('should be called properly (2)', () => {
      rendered.setProps({ id: 123 });
      result = { id: 2, imageUrl: '/some/url/of/image.jpg' };

      instance.getFolderImageSuccess(result);
      funcResult = resagaValues.cardImageList({ 456: '/another/img.jpg' });

      expect(funcResult).toEqual({
        123: '/some/url/of/image.jpg',
        456: '/another/img.jpg',
      });
    });
  });

  it('should show actions for delete and other stuff', () => {
    rendered.setProps({
      showActions: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should use another card if isEditable is true', () => {
    rendered.setProps({
      isEditable: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
