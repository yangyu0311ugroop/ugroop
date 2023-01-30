import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { OpenClosed } from '../index';

describe('<OpenClosed />', () => {
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

  const children = jest.fn();

  beforeEach(() => {
    rendered = shallow(<OpenClosed {...props}>{children}</OpenClosed>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OpenClosed).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
  });
});
