import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import Form from 'ugcomponents/Form';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';

import styles from '../styles';
import { KnownAs } from '../index';

const mockStyles = mockStylesheet('KnownAs', styles, theme);

describe('<KnownAs />', () => {
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
    rendered = shallow(<KnownAs {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(KnownAs).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should setValue if there is no hasPersonDetail and there is organisationId', () => {
      rendered.setProps({
        hasPersonDetail: false,
        organisationId: 1,
      });
      instance.componentDidMount();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('getEditableName()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.getEditableName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleEditableSubmit()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>
          {instance.handleEditableSubmit({
            model: {},
            onSuccess: jest.fn(),
            onError: jest.fn(),
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderStringOnly', () => {
    it('should render tooltip', () => {
      rendered.setProps({
        isTooltip: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderStringOnly);
    });
    it('should render isPersonal', () => {
      rendered.setProps({
        isPersonal: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderStringOnly);
    });
    it('should render default', () => {
      rendered.setProps({
        isPersonal: false,
        isTooltip: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderStringOnly);
    });
  });
  describe('renderEllipsisString()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        maxCharCountToEllipsis: 30,
        firstName: 'ccc',
        lastName: 'ddd',
      });
      const snapshot = shallow(<div>{instance.renderEllipsisString()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if name length is greater than maxCharCountToEllipsis', () => {
      rendered.setProps({
        maxCharCountToEllipsis: 1,
        knownAs: 'QQQAAA',
      });
      const snapshot = shallow(<div>{instance.renderEllipsisString()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValueOnly', () => {
    it('should return knownAs if knownAs have value', () => {
      rendered.setProps({
        knownAs: 'Ye',
      });
      const result = instance.renderValueOnly();

      expect(result).toBe('Ye');
    });

    it('should return firstname + lastname if knownAs is null', () => {
      rendered.setProps({
        firstName: 'AA',
        lastName: 'BB',
        knownAs: null,
      });
      const result = instance.renderValueOnly();

      expect(result).toBe('AA BB');
    });
  });

  describe('renderTextOnly', () => {
    it('should render tooltip if isMatchToName is true', () => {
      rendered.setProps({
        isMatchToName: true,
        knownAs: 'known As',
        firstName: '',
        lastName: 'last name',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });

    it('should render tooltip if isMatchToName is true should show alias', () => {
      rendered.setProps({
        isMatchToName: true,
        knownAs: 'john L',
        firstName: 'john',
        lastName: 'L',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });

    it('should render tooltip if isMatchToName is false', () => {
      rendered.setProps({
        isMatchToName: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });

  describe('renderEditable()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

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
        variant: VARIANTS.TEXT_ONLY,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is text field', () => {
      rendered.setProps({
        variant: VARIANTS.TEXT_FIELD,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text field if variant is string only', () => {
      rendered.setProps({
        variant: VARIANTS.STRING_ONLY,
      });
      const snapshot = shallow(<Form>{instance.render()}</Form>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
