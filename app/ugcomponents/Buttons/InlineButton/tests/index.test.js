import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { InlineButton } from '../index';

describe('<InlineButton />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<InlineButton {...props}>Button</InlineButton>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InlineButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render custom props', () => {
      rendered.setProps({
        textAlign: true,
        hover: true,
        darkMode: true,
        xs: true,
        sm: true,
        md: true,
        lg: true,
        bold: true,
        disabled: true,
        italic: true,
        spanBlock: true,
        offsetLeft: true,
        offsetRight: true,
        displayBlock: true,
        padding: 'sm',
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
