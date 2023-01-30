import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UpdatedAt } from '../index';

describe('<UpdatedAt />', () => {
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
    rendered = shallow(<UpdatedAt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UpdatedAt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderSimpleTooltip()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderSimpleTooltip()}</div>);

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
