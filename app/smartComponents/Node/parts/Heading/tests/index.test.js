import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Heading } from '../index';

describe('<Heading />', () => {
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

    rendered = shallow(<Heading {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Heading).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('startEditing()', () => {
    it('should startEditing()', () => {
      instance.startEditing();

      expect(rendered.state().edit).toBe(true);
    });
  });

  describe('finishEditing()', () => {
    it('should finishEditing()', () => {
      instance.finishEditing();

      expect(rendered.state().edit).toBe(false);
    });
  });

  describe('clearHeading()', () => {
    it('should clearHeading()', () => {
      instance.handleUpdateHeading = jest.fn();

      instance.clearHeading();

      TEST_HELPERS.expectCalled(instance.handleUpdateHeading);
    });
  });

  describe('handleUpdateHeading()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0 });

      expect(instance.handleUpdateHeading()).toBe(false);
    });

    it('should handleUpdateHeading', () => {
      NODE_API_HELPERS.updateNode = jest.fn();
      rendered.setProps({ id: 2233 });

      instance.handleUpdateHeading();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.updateNode);
    });
  });

  describe('canAddHeading()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: false, editing: false });

      expect(instance.canAddHeading()).toBe(false);
    });

    it('should canAddHeading', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editable: false, editing: true });

      TEST_HELPERS.expectMatchSnapshot(instance.canAddHeading);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('renderEmpty()', () => {
    it('should return null', () => {
      rendered.setProps({ xs: true });

      expect(instance.renderEmpty()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ xs: true });
      instance.canAddHeading = jest.fn(() => false);

      expect(instance.renderEmpty()).toBe(null);
    });

    it('should renderEmpty', () => {
      rendered.setProps({ xs: false });
      instance.canAddHeading = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderHeading()', () => {
    it('should renderHeading', () => {
      rendered.setProps({ xs: false, subheading: 'subheading' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ noHeading: true });

      expect(instance.render()).toBe(null);
    });

    it('should renderForm', () => {
      instance.renderForm = jest.fn(() => 'renderForm');
      rendered.setState({ edit: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderEmpty', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      rendered.setProps({ heading: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderEmpty null', () => {
      rendered.setProps({ heading: '' });
      instance.renderEmpty = jest.fn(() => '');

      expect(instance.render()).toBe(null);
    });

    it('should renderHeading readonly', () => {
      instance.canAddHeading = jest.fn(() => false);
      instance.renderHeading = jest.fn(() => 'renderHeading');
      rendered.setProps({ heading: 'heading' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderHeading editable', () => {
      instance.canAddHeading = jest.fn(() => true);
      rendered.setProps({ heading: 'heading', component: 'span' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
