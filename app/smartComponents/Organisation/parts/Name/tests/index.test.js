import { SUB_TITLE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import { VARIANTS } from 'variantsConstants';
import styles from '../styles';
import { Name } from '../index';

const mockStyles = mockStylesheet('Name', styles, theme);

describe('<Name />', () => {
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
    rendered = shallow(<Name {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Name).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderText()', () => {
    it('should renderText', () => {
      rendered.setProps({ name: 'some name' });

      expect(instance.renderText()).toMatchSnapshot();
    });
    it('should renderText default', () => {
      rendered.setProps({ name: '' });

      expect(instance.renderText()).toMatchSnapshot();
    });
  });

  describe('renderTitle()', () => {
    it('should renderTitle', () => {
      instance.renderText = jest.fn(() => 'renderText');

      const snapshot = shallow(<div>{instance.renderTitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSubtitle()', () => {
    it('should render null', () => {
      rendered.setProps({ name: '' });

      TEST_HELPERS.expectNull(instance.renderSubtitle);
    });
    it('should renderSubtitle', () => {
      rendered.setProps({ name: 'some name' });
      instance.renderText = jest.fn(() => 'renderText');

      const snapshot = shallow(<div>{instance.renderSubtitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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
    it('should render text only variant', () => {
      rendered.setProps({
        variant: SUB_TITLE,
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

    it('should render span if variant is span only', () => {
      rendered.setProps({
        variant: VARIANTS.SPAN_ONLY,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render string if variant is string only', () => {
      rendered.setProps({
        variant: VARIANTS.STRING_ONLY,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render avatar if variant is string only', () => {
      rendered.setProps({
        variant: VARIANTS.AVATAR_ONLY,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
