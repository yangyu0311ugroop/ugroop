import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Hover from 'viewComponents/Hover';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TabOther } from '../index';

describe('<TabOther />', () => {
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
    LOGIC_HELPERS.ifFunction = jest.fn(() => jest.fn());
    rendered = shallow(<TabOther {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabOther).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should call ifFunction of logic helpers', () => {
      instance.handleClick();
      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render hover correctly', () => {
      const wrapper = rendered.find(Hover).renderProp('children')({});

      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
