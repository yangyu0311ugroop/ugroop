import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { ADVANCED_EDIT_MODE, INLINE_EDIT_MODE, VIEW_MODE } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NodeProp } from '../index';

describe('<NodeProp />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    darkMode: true,
    content: 'some content',
    classes: { default: 'default', disabled: 'disabled' },
    resaga,
    id: 2233,
    onSave: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<NodeProp {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NodeProp).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  // inline editable functions
  describe('startEdit()', () => {
    it('should setState', () => {
      rendered.setState({ editing: false });
      instance.stopPropagation = jest.fn();

      instance.startEdit(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().mode).toBe(INLINE_EDIT_MODE);
    });
  });

  describe('startAdvancedEdit()', () => {
    it('should setState', () => {
      rendered.setState({ editing: false });
      instance.stopPropagation = jest.fn();

      instance.startAdvancedEdit(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().mode).toBe(ADVANCED_EDIT_MODE);
    });
  });

  describe('finishEdit()', () => {
    it('should setState', () => {
      rendered.setState({ editing: true });
      instance.stopPropagation = jest.fn();

      instance.finishEdit(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().mode).toBe(VIEW_MODE);
    });
  });

  describe('stopPropagation()', () => {
    it('should do nothing', () => {
      rendered.setProps({ stopPropagation: false });

      expect(instance.stopPropagation({})).toBe(false);
      expect(instance.stopPropagation()).toBe(false);
    });

    it('should call event.stopPropagation', () => {
      rendered.setProps({ stopPropagation: true });
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps();

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('gridClassName()', () => {
    it('should return gridClassName', () => {
      rendered.setProps({ gridClassName: 'customgridClassName' });

      expect(instance.gridClassName()).toMatchSnapshot();
    });
  });

  describe('handleFormRef()', () => {
    it('should handleFormRef', () => {
      instance.handleFormRef(123);

      expect(instance.form).toBe(123);
    });
  });

  describe('handleSuccess()', () => {
    it('should handleSuccess', () => {
      const event = 'event';
      instance.finishEdit = jest.fn();
      instance.handleSuccess()(event);

      expect(instance.finishEdit).toBeCalledWith(event);
      expect(instance.props.onSave).toBeCalled();
    });
  });

  describe('submitForm()', () => {
    it('should return null', () => {
      rendered.setProps({ autoSaveOnBlur: false });

      expect(instance.submitForm()).toBe(false);
    });

    it('should submitForm', () => {
      instance.form = { submitForm: jest.fn() };
      rendered.setProps({ autoSaveOnBlur: true });

      instance.submitForm();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.form.submitForm);
    });
  });

  describe('isEmpty()', () => {
    it('should call isEmpty', () => {
      const isEmpty = jest.fn(() => 'isEmpty');
      rendered.setProps({ isEmpty });

      expect(instance.isEmpty(123)).toBe('isEmpty');
      TEST_HELPERS.expectCalledAndMatchSnapshot(isEmpty);
    });

    it('should return default logic', () => {
      expect(instance.isEmpty()).toBe(true);
      expect(instance.isEmpty(123)).toBe(false);
    });
  });

  describe('isEqual()', () => {
    it('should return true', () => {
      instance.isEmpty = jest.fn(() => true);

      expect(instance.isEqual({})).toBe(true);
    });

    it('should call isEqual', () => {
      instance.isEmpty = jest.fn(() => false);
      const isEqual = jest.fn(() => 'isEqual');
      rendered.setProps({ isEqual });

      expect(instance.isEqual({})).toBe('isEqual');
      TEST_HELPERS.expectCalledAndMatchSnapshot(isEqual);
    });

    it('should return default logic', () => {
      instance.isEmpty = jest.fn(() => false);
      rendered.setProps({ value: 'value', valueKey: 'content' });

      expect(instance.isEqual({ content: 'value' })).toBe(true);
    });
  });

  describe('makeNode()', () => {
    it('should call makeNode', () => {
      const makeNode = jest.fn(() => 'makeNode');
      rendered.setProps({ makeNode });

      expect(instance.makeNode({})).toBe('makeNode');
      TEST_HELPERS.expectCalledAndMatchSnapshot(makeNode);
    });

    it('should return isCustomData true', () => {
      rendered.setProps({
        isCustomData: true,
        value: 'value',
        valueKey: 'description',
      });

      expect(instance.makeNode({ description: 'value' })).toMatchSnapshot();
    });

    it('should return isCustomData false', () => {
      rendered.setProps({
        isCustomData: false,
        value: 'value',
        valueKey: 'content',
      });

      expect(instance.makeNode({ description: 'content' })).toMatchSnapshot();
    });
  });

  describe('clearContent()', () => {
    it('should call handleValidSubmit', () => {
      instance.handleValidSubmit = jest.fn();

      instance.clearContent();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleValidSubmit);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should finish if this.isEqual', () => {
      instance.isEqual = jest.fn(() => true);
      instance.finishEdit = jest.fn();

      instance.handleValidSubmit();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.finishEdit);
    });

    it('should not do anything if updatingNode', () => {
      instance.isEqual = jest.fn(() => false);
      rendered.setProps({ updatingNode: true });

      expect(instance.handleValidSubmit()).toBe(false);
    });

    it('should not call updateNode', () => {
      instance.isEqual = jest.fn(() => false);
      rendered.setProps({ updatingNode: false });
      NODE_API_HELPERS.updateNode = jest.fn(
        () => 'NODE_API_HELPERS.updateNode',
      );

      expect(instance.handleValidSubmit({})).toBe(
        'NODE_API_HELPERS.updateNode',
      );
    });
  });

  describe('renderView()', () => {
    it('should call renderView', () => {
      const renderView = jest.fn(() => 'renderView');
      rendered.setProps({ renderView });

      expect(instance.renderView()).toBe('renderView');
    });

    it('should return false', () => {
      const renderView = jest.fn(() => false);
      rendered.setProps({ renderView, showEmpty: false });

      expect(instance.renderView()).toBe(false);
    });

    it('should return noContent', () => {
      const renderView = jest.fn(() => false);
      rendered.setProps({ renderView, showEmpty: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderView);
    });
  });

  describe('renderComponent()', () => {
    it('should renderComponent', () => {
      instance.renderView = jest.fn(() => 'renderView');

      TEST_HELPERS.expectMatchSnapshot(instance.renderComponent);
    });
    it('should renderComponent ellipsis', () => {
      rendered.setProps({ ellipsis: true });
      instance.renderView = jest.fn(() => 'renderView');

      TEST_HELPERS.expectMatchSnapshot(instance.renderComponent);
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      instance.isEmpty = jest.fn(() => true);
      rendered.setProps({ showEmpty: false });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderViewing', () => {
      instance.isEmpty = jest.fn(() => false);
      instance.renderViewing = jest.fn(() => 'renderViewing');
      rendered.setState({ mode: VIEW_MODE });

      expect(instance.renderDefault()).toBe('renderViewing');
    });

    it('should renderEditing', () => {
      instance.isEmpty = jest.fn(() => false);
      instance.renderEditing = jest.fn(() => 'renderEditing');
      rendered.setState({ mode: INLINE_EDIT_MODE });

      expect(instance.renderDefault()).toBe('renderEditing');
    });

    it('should render children', () => {
      const children = jest.fn(() => 'children');
      instance.isEmpty = jest.fn(() => false);
      instance.renderViewing = jest.fn();
      rendered.setProps({ children });

      expect(instance.renderDefault()).toBe('children');
    });
  });

  describe('renderViewing()', () => {
    it('should renderComponent', () => {
      instance.renderComponent = jest.fn(() => 'renderComponent');

      rendered.setProps({ editable: false });

      expect(instance.renderViewing()).toBe('renderComponent');
    });

    it('should renderViewing', () => {
      instance.renderComponent = jest.fn(() => 'renderComponent');
      rendered.setProps({ editable: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderViewing);
    });
  });

  describe('renderAdvancedButton()', () => {
    it('should renderAdvancedButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAdvancedButton);
    });
  });

  describe('renderClearButton()', () => {
    it('should return false', () => {
      instance.isEmpty = jest.fn(() => true);

      expect(instance.renderClearButton()).toBe(false);
    });

    it('should renderClearButton', () => {
      instance.isEmpty = jest.fn(() => false);

      rendered.setProps({ advancedMode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderClearButton);
    });
  });

  describe('renderAdvancedButtons()', () => {
    it('should renderAdvancedButtons', () => {
      instance.renderAdvancedButton = jest.fn(() => 'renderAdvancedButton');
      instance.renderClearButton = jest.fn(() => 'renderClearButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAdvancedButtons);
    });
  });

  describe('renderButtons()', () => {
    it('should updatingNode', () => {
      rendered.setProps({ updatingNode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });

    it('should renderAdvancedButtons', () => {
      rendered.setProps({ advancedMode: true });
      instance.renderAdvancedButtons = jest.fn(() => 'renderAdvancedButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });

    it('should renderButtons', () => {
      rendered.setProps({ updatingNode: false, advancedMode: false });
      instance.renderAdvancedButtons = jest.fn(() => 'renderAdvancedButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });
  });

  describe('renderEdit()', () => {
    it('should return null', () => {
      const renderEdit = jest.fn(() => 'renderEdit');
      rendered.setProps({ renderEdit });

      expect(instance.renderEdit()).toBe('renderEdit');
      TEST_HELPERS.expectCalledAndMatchSnapshot(renderEdit);
    });

    it('should renderEdit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEdit);
    });
  });

  describe('renderEditing()', () => {
    it('should renderEditing', () => {
      instance.renderEdit = jest.fn(() => 'renderEdit');
      instance.renderButtons = jest.fn(() => 'renderButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEditing);
    });
  });

  describe('renderText()', () => {
    it('should return null', () => {
      rendered.setProps({ value: undefined });

      expect(instance.renderText()).toBe(null);
    });

    it('should renderText', () => {
      rendered.setProps({ value: 'value' });

      expect(instance.renderText()).toBe('value');
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('#defaultProps', () => {
    it('#onSave()', () => {
      expect(() => {
        NodeProp.defaultProps.onSave();
      }).not.toThrow();
    });
  });
});
