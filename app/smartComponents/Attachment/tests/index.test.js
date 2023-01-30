import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { EMPTY_RTE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Attachment } from '../index';

describe('<Attachment />', () => {
  let rendered;
  let instance;

  const resaga = {
    id: 2233,
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Attachment {...props} />);
    instance = rendered.instance();
  });

  describe('hasDescription()', () => {
    it('should return false', () => {
      rendered.setProps({ description: null });

      expect(instance.hasDescription()).toBe(false);
    });

    it('should return false #2', () => {
      rendered.setProps({ description: EMPTY_RTE });

      expect(instance.hasDescription()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ description: 'other' });

      expect(instance.hasDescription()).toBe(true);
    });
  });

  describe('handleEditableSubmit()', () => {
    it('should createAttachment', () => {
      NODE_API_HELPERS.createAttachment = jest.fn();
      rendered.setProps({ id: 0 });

      instance.handleEditableSubmit({
        model: { attachment: { name: 'name' } },
      });

      TEST_HELPERS.expectMatchSnapshot(NODE_API_HELPERS.createAttachment);
    });

    it('should handleEditableSubmit', () => {
      NODE_API_HELPERS.updateAttachment = jest.fn();
      rendered.setProps({ id: 1 });

      instance.handleEditableSubmit({
        model: { attachment: { name: 'name' } },
      });

      TEST_HELPERS.expectMatchSnapshot(NODE_API_HELPERS.updateAttachment);
    });
  });

  describe('handleEditableDeleteClick()', () => {
    it('should removeAttachment', () => {
      NODE_API_HELPERS.removeAttachment = jest.fn();

      instance.handleEditableDeleteClick({})({});

      TEST_HELPERS.expectMatchSnapshot(NODE_API_HELPERS.removeAttachment);
    });
  });

  describe('renderPart()', () => {
    it('should renderPart', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart, ['span']);
    });
  });

  describe('renderDescription()', () => {
    it('should return null', () => {
      instance.hasDescription = jest.fn(() => false);

      expect(instance.renderDescription()).toBe(false);
    });

    it('should renderDescription', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      instance.hasDescription = jest.fn(() => true);

      expect(instance.renderDescription()).toBe('renderPart');
    });
  });

  describe('renderTextOnly()', () => {
    it('should renderTextOnly', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
  });

  describe('renderTextField()', () => {
    it('should renderTextField', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextField);
    });
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      rendered.setProps({
        hasMaxWidth: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('renderEditableFormActions()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0 });

      expect(instance.renderEditableFormActions({})()).toBe(false);
    });

    it('should renderEditableFormActions', () => {
      rendered.setProps({ id: 1 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableFormActions({}));
    });
  });

  describe('renderEditable()', () => {
    it('should return null', () => {
      rendered.setProps({ id: false, showEmpty: false });

      expect(instance.renderEditable()).toBe(null);
    });

    it('should renderEditable', () => {
      rendered.setProps({ id: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
