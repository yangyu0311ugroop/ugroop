import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import styles from '../styles';
import { EndTime } from '../index';

const mockStyles = mockStylesheet('EndTime', styles, theme);
const tempDate = '2019-01-01';

describe('<EndTime />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };

  const props = {
    classes: mockStyles,
    resaga,
    intl,
  };

  beforeEach(() => {
    rendered = shallow(<EndTime {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EndTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('getTempDate()', () => {
    it('should return a date', () => {
      expect(typeof instance.getTempDate()).toBe('string');
    });
  });
  describe('getValue()', () => {
    it('should render correctly when value is null', () => {
      expect(instance.getValue()).toEqual(null);
    });
    it('should render correctly', () => {
      instance.getTempDate = jest.fn(() => tempDate);
      rendered.setProps({ endTime: '1:00' });
      expect(instance.getValue()).toEqual(`${tempDate} 1:00`);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
