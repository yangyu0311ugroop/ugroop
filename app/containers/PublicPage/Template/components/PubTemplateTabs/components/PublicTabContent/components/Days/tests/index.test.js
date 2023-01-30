import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { Days } from '../index';
import styles from '../styles';

describe('<Days />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dayId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<Days {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Days).toBeDefined();
  });

  it('should match style snapshot', () => {
    const snapshot = mockStylesheet('', styles, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps', () => {
    it('shall set correct value', () => {
      const nextProps = { currentQueryDayId: 1 };
      rendered.setProps({ currentQueryDayId: -1 });
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.currentDayId).toBe(nextProps.currentQueryDayId);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if days.length is 2 and sections.length is 1', () => {
      rendered.setProps({ days: [1, 2], sections: [3] });
      const newInstance = rendered.instance();
      const snapshot = shallow(<div>{newInstance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('getCurrentDayId', () => {
    it('shall return correct value', () => {
      rendered.setProps({ days: [1] });
      rendered.setState({ currentDayId: -1 });
      expect(instance.getCurrentDayId()).toBe(1);
    });
    it('shall return correct value', () => {
      rendered.setProps({ days: [] });
      rendered.setState({ currentDayId: -1 });
      expect(instance.getCurrentDayId()).toBe(-1);
    });
  });
});
