import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { Number } from '../index';

describe('<Number />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Number {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Number).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClickNumber', () => {
    it('should call window open that redirects user to dial the number', () => {
      window.open = jest.fn();

      instance.handleClickNumber();

      expect(window.open).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is editable', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is inline text', () => {
      rendered.setProps({
        variant: VARIANTS.INLINE_TEXT,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderEditable', () => {
    it('should render correctly if country string has length greater than 2', () => {
      rendered.setProps({
        country: 'AUS',
        number: '1',
      });

      instance.renderEditable();
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderProp', () => {
    it('should return children with value: number', () => {
      const children = jest.fn();
      rendered.setProps({
        children,
        number: 1,
      });
      instance.renderProp();
      expect(children).toHaveBeenCalledWith({ value: 1 });
    });
  });
});
