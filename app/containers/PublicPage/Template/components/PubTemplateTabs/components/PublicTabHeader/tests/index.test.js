import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TabHeaderContainer } from '../index';

describe('<TabHeaderContainer />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<TabHeaderContainer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabHeaderContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly with no data', () => {
      rendered.setProps({
        data: [],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
