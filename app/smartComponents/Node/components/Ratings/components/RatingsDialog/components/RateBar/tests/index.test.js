import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RateBar } from '../index';

describe('<RateBar />', () => {
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
    rendered = shallow(<RateBar {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RateBar).toBeDefined();
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
