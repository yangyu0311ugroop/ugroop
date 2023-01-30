import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGTemplateItem } from '../index';
import util from '../../util';

describe('TemplateItem ', () => {
  let rendered;
  let instance;
  let tempDispatchTo;
  const customData = { duration: 5 };
  const content = 'Small Group Tokyo Biking Tour';
  let resaga;
  let resagaValues;

  const props = {
    onDelete: jest.fn(),
    onMove: jest.fn(),
    onCopy: jest.fn(),
    customData,
    content,
    id: 15,
  };

  beforeEach(() => {
    resagaValues = {};
    resaga = {
      setValue: obj => {
        resagaValues = { ...resagaValues, ...obj };
      },
    };

    tempDispatchTo = util.dispatch;
    util.dispatch = jest.fn();

    rendered = shallow(<UGTemplateItem resaga={resaga} {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  afterEach(() => {
    util.dispatch = tempDispatchTo;
  });

  it('should exist ', () => {
    expect(UGTemplateItem).toBeDefined();
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

    it('should be called properly if cardImageUrl exists and nonempty', () => {
      rendered.setProps({ cardImageUrl: '/some/image.jpg' });
      instance.componentDidMount();
      expect(util.dispatch).not.toHaveBeenCalled();
    });

    it('should be called properly if cardImageUrl exists and empty', () => {
      rendered.setProps({ cardImageUrl: '' });
      instance.componentDidMount();
      expect(util.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('getTemplateImageSuccess', () => {
    let result;
    let funcResult;

    it('should be called properly (1)', () => {
      rendered.setProps({ id: 123 });
      result = [{ id: 2, content: '/some/url/of/image.jpg' }];

      instance.getTemplateImageSuccess(result);
      funcResult = resagaValues.cardImageList();

      expect(funcResult).toEqual({ 123: '/some/url/of/image.jpg' });
    });

    it('should be called properly (2)', () => {
      rendered.setProps({ id: 123 });
      result = [{ id: 2, content: '/some/url/of/image.jpg' }];

      instance.getTemplateImageSuccess(result);
      funcResult = resagaValues.cardImageList({ 456: '/another/img.jpg' });

      expect(funcResult).toEqual({
        123: '/some/url/of/image.jpg',
        456: '/another/img.jpg',
      });
    });

    it('should be called properly (3)', () => {
      rendered.setProps({ id: 789 });
      result = [{}];

      instance.getTemplateImageSuccess(result);
      funcResult = resagaValues.cardImageList({ 456: '/another/img.jpg' });

      expect(funcResult).toEqual({ 456: '/another/img.jpg', 789: '' });
    });
  });

  it('should hide actions if showActions is false', () => {
    rendered.setProps({
      showActions: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
