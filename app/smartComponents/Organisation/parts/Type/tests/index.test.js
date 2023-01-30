import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import styles from '../styles';
import { Type } from '../index';

const mockStyles = mockStylesheet('OrgType', styles, theme);

describe('<OrgType />', () => {
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
    orgTypes: [{ 0: { code: 1, name: 'test' } }],
  };

  beforeEach(() => {
    rendered = shallow(<Type {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Type).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call getOrgTypes', () => {
      instance.getOrgTypes = jest.fn(() => 'getOrgTypes');

      rendered.setProps({ orgTypes: [] });

      expect(instance.componentDidMount()).toBe('getOrgTypes');
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ orgTypes: [1, 2, 3] });

      expect(instance.componentDidMount()).toBe(DO_NOTHING);
    });
  });

  describe('getOrgTypes()', () => {
    it('should call resaga.dispatchTo', () => {
      instance.getOrgTypes();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderSelect()', () => {
    it('should renderSelect', () => {
      rendered.setProps({ orgTypes: [1, 2, 3] });

      const snapshot = shallow(<div>{instance.renderSelect()}</div>);

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
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: ORG_FIELD_VARIANTS.TEXT_WITH_LABEL,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
