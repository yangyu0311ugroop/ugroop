import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { JDialog } from 'ugcomponents/JDialog/index';

describe('<JDialog />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<JDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(JDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('ownProps()', () => {
    it('should ownProps', () => {
      TEST_HELPERS.expectDefined(instance.ownProps);
    });
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      TEST_HELPERS.expectDefined(instance.renderForm);
    });
  });

  describe('renderNotes()', () => {
    it('should return null', () => {
      rendered.setProps({ notes: null });

      expect(instance.renderNotes()).toBe(null);
    });

    it('should renderNotes', () => {
      rendered.setProps({ notes: 'notes', fullWidthNotes: true });

      TEST_HELPERS.expectDefined(instance.renderNotes);
    });
  });

  describe('renderActions()', () => {
    it('should return null', () => {
      rendered.setProps({ hideSubmitButton: true });

      expect(instance.renderActions()).toBe(false);
    });

    it('should renderActions', () => {
      rendered.setProps({ hideSubmitButton: true });

      TEST_HELPERS.expectDefined(instance.renderActions);
    });
    it('should render customAction', () => {
      rendered.setProps({ customAction: true, actionDivider: true });

      TEST_HELPERS.expectDefined(instance.renderActions);
    });
  });
  describe('onInvalidSubmit()', () => {
    it('should onInvalidSubmit return default function', () => {
      TEST_HELPERS.expectDefined(JDialog.defaultProps.onInvalidSubmit());
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({ header: 'header', actions: 'actions' });

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
