import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { TabGallery } from '../index';
import styles from '../styles';

describe('<TabGallery />', () => {
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
    rendered = shallow(<TabGallery {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(TabGallery).toBeDefined();
      expect(styles).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render list correctly', () => {
      rendered.setProps({ sectionIds: [1, 2] });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
