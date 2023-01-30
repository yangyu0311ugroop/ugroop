import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import styles from '../styles';
import { SchoolGender } from '../index';

const mockStyles = mockStylesheet('SchoolGender', styles, theme);

describe('<SchoolGender />', () => {
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
    subTypes: [{ 0: { code: 1, name: 'test' } }],
  };

  beforeEach(() => {
    rendered = shallow(<SchoolGender {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(SchoolGender).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
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
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
