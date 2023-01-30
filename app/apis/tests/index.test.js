import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { API } from '../index';

describe('<API />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<API />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(API).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('shouldComponentUpdate()', () => {
    it('should NOT shouldComponentUpdate', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
