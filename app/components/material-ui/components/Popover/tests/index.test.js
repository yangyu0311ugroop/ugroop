import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Popover } from '../index';

describe('<Popover />', () => {
  let rendered;
  let instance;

  const props = {
    this: 'props',
    that: 'other props',
  };

  beforeEach(() => {
    rendered = shallow(<Popover {...props}>123</Popover>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Popover).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
