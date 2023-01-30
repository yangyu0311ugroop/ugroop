import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Empty } from '../index';

describe('<Empty />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<Empty {...props} />);
    instance = rendered.instance();
  });

  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(Empty).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should render properly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
