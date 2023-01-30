import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Time } from '../index';

describe('<Time />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    createdAt: '1/1/2018 12:34:56',
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Time {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Time).toBeDefined();
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
