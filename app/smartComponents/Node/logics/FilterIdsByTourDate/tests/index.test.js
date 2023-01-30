import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FilterIdsByTourDate } from '../index';

describe('<FilterIdsByTourDate />', () => {
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
    rendered = shallow(
      <FilterIdsByTourDate {...props}>{children}</FilterIdsByTourDate>,
    );
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FilterIdsByTourDate).toBeDefined();
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
