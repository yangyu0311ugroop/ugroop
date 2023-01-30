import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { BadgeProgress } from '../index';

describe('<BadgeProgress />', () => {
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
    rendered = shallow(<BadgeProgress {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BadgeProgress).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderUI()', () => {
    it('should renderUI', () => {
      const snapshot = shallow(
        <div>{instance.renderUI({ custom: 'prop' })({ hoc: 'prop' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
