import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Section } from '../index';

describe('<Section />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<Section {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Section).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should NOT render if NOT exist', () => {
      rendered.setProps({ exist: 0 });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      rendered.setProps({ exist: 123 });
      instance.renderUpDown = jest.fn(() => 'renderUpDown');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
