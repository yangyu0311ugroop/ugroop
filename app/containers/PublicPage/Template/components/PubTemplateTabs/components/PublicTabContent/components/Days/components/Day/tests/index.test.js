import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import styles from '../styles';
import { Day } from '../index';

describe('<Day />', () => {
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
    rendered = shallow(<Day {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Day).toBeDefined();
  });

  it('should match style snapshot', () => {
    const snapshot = mockStylesheet('', styles, coolTheme);
    expect(snapshot).toMatchSnapshot();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ description: 'abcd' });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
