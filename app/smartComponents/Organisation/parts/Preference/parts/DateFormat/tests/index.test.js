import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import momentHelpers from 'utils/helpers/moment';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import styles from '../styles';
import { DateFormat } from '../index';
import { VARIANTS } from '../../../../../../../variantsConstants';

const mockStyles = mockStylesheet('DateFormat', styles, theme);

describe('<DateFormat />', () => {
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
  momentHelpers.getDateToday = jest.fn(() => '04/26/1977');
  beforeEach(() => {
    rendered = shallow(<DateFormat {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(DateFormat).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderOption()', () => {
    it('should return null', () => {
      rendered.setProps({ disabled: true });

      expect(instance.renderOption()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      momentHelpers.getDateToday = jest.fn(() => '04/26/1977');
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
    it('should render text field if variant is text field and selectedValue has a value', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
      });
      rendered.setState({
        selectedValue: 'any value',
      });
      expect(momentHelpers.getDateToday()).toBeDefined();
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant', () => {
      rendered.setProps({
        variant: VARIANTS.STRING_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('setstate()', () => {
    it('should render correctly', () => {
      instance.setFormatFromOption('mm/dd/yyyy');
      expect(instance.state.selectedValue).toBe('mm/dd/yyyy');
    });
  });
});
