import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import coolTheme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { Itinerary } from '../index';
import styles from '../styles';

describe('<Itinerary />', () => {
  let rendered;
  let instance;

  const props = {
    id: 1,
    index: 1,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<Itinerary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Itinerary).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('Itinerary style', () => {
    it('should match snapshot', () => {
      const snapshot = mockStylesheet('Itinerary', styles, coolTheme);
      expect(snapshot).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
