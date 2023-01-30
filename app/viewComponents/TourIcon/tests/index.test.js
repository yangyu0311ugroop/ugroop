import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { TourIcon } from '../index';

describe('TourIcon/tests/index.test.js', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<TourIcon classes={{}} />);
    instance = rendered.instance();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(TourIcon).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render tour icon', () => {
      rendered.setProps({
        icon: 'arrival',
        dateTime: '2D',
        caret: true,
        solid: true,
        dense: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render caret icon', () => {
      rendered.setProps({ caret: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
