import {
  VIEW_MODE,
  ADVANCED_EDIT_MODE,
  EMPTY_RTE,
  INLINE_EDIT_MODE,
} from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EditableRTE } from '../index';

describe('<EditableRTE />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    nodePath: ['customData', 'someProp'],
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<EditableRTE {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditableRTE).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('empty()', () => {
    it('should return true #1', () => {
      rendered.setProps({ content: '' });
      expect(instance.empty()).toBe(true);
    });

    it('should return true #2', () => {
      rendered.setProps({ content: EMPTY_RTE });
      expect(instance.empty()).toBe(true);
    });

    it('should return false #2', () => {
      rendered.setProps({ content: 'some content' });
      expect(instance.empty()).toBe(false);
    });
  });

  describe('handleFormRef()', () => {
    it('should handleFormRef()', () => {
      instance.handleFormRef('ref');

      expect(instance.form).toBe('ref');
    });
  });

  describe('submitForm()', () => {
    it('should submitForm()', () => {
      rendered.setProps({ autoSaveOnBlur: true });
      instance.form = { submitForm: jest.fn() };

      instance.submitForm();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.form.submitForm);
    });

    it('should NOT submitForm()', () => {
      rendered.setProps({ autoSaveOnBlur: false });
      instance.form = { submitForm: jest.fn() };

      instance.submitForm();

      expect(instance.form.submitForm).not.toBeCalled();
    });
  });

  describe('clearContent()', () => {
    it('should call changeEditableRTE', () => {
      instance.changeEditableRTE = jest.fn();

      instance.clearContent();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeEditableRTE);
    });
  });

  // inline editable functions
  describe('startEdit()', () => {
    it('should setState', () => {
      instance.startEdit(2233);

      expect(rendered.state().mode).toBe(INLINE_EDIT_MODE);
    });
  });

  describe('startAdvancedEdit()', () => {
    it('should setState', () => {
      instance.startAdvancedEdit(2233);

      expect(rendered.state().mode).toBe(ADVANCED_EDIT_MODE);
    });
  });

  describe('finishEdit()', () => {
    it('should setState', () => {
      instance.finishEdit(2233);

      expect(rendered.state().mode).toBe(VIEW_MODE);
    });
  });

  describe('changeEditableRTE()', () => {
    it('should call dispatchTo Node', () => {
      rendered.setProps({
        updatingNode: false,
        hashKeyDesc: false,
        content: 'current',
        nodePath: ['customData', 'someProp'],
      });

      instance.changeEditableRTE({ content: 'content' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo Hashkey', () => {
      rendered.setProps({
        updatingNode: false,
        hashKeyDesc: true,
        content: 'current',
        nodePath: ['haskeyDescription'],
      });

      instance.changeEditableRTE({ content: 'content' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should return null', () => {
      rendered.setProps({ updatingNode: true });

      expect(instance.changeEditableRTE({ content: 'content' })).toBe(null);
    });

    it('should finishEdit', () => {
      rendered.setProps({
        updatingNode: false,
        hashKeyDesc: true,
        content: 'content',
      });
      instance.finishEdit = jest.fn(() => 'finishEdit');

      expect(instance.changeEditableRTE({ content: 'content' })).toBe(
        'finishEdit',
      );
    });
  });

  describe('renderHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ showHeader: false });

      expect(instance.renderHeader()).toBe(null);
    });

    it('should renderHeader', () => {
      rendered.setProps({
        showHeader: true,
        headingIcon: 'headingIcon',
        headingLabel: 'headingLabel',
      });

      const snapshot = shallow(<div>{instance.renderHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAdvancedButton()', () => {
    it('should return null', () => {
      rendered.setProps({ advancedMode: false });

      expect(instance.renderAdvancedButton()).toBe(null);
    });

    it('should renderAdvancedButton', () => {
      rendered.setProps({ advancedMode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAdvancedButton);
    });
  });

  describe('renderClearButton()', () => {
    it('should return false', () => {
      instance.empty = jest.fn(() => true);

      expect(instance.renderClearButton()).toBe(false);
    });

    it('should renderClearButton', () => {
      instance.empty = jest.fn(() => false);

      rendered.setProps({ advancedMode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderClearButton);
    });
  });

  describe('renderButtons()', () => {
    it('should return loading', () => {
      rendered.setProps({ updatingNode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });

    it('should renderButtons', () => {
      rendered.setProps({ updatingNode: false });
      instance.renderAdvancedButton = jest.fn(() => 'renderAdvancedButton');
      instance.renderClearButton = jest.fn(() => 'renderClearButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });
  });

  describe('renderEdit()', () => {
    it('should renderEdit', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderButtons = jest.fn(() => 'renderButtons');

      const snapshot = shallow(<div>{instance.renderEdit()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmptyView()', () => {
    it('should renderEmptyView', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      rendered.setProps({ dense: true });
      const snapshot = shallow(<div>{instance.renderEmptyView()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmptyCompressed()', () => {
    it('should renderEmptyCompressed', () => {
      const snapshot = shallow(<div>{instance.renderEmptyCompressed()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderView()', () => {
    it('should return null if !showEmpty', () => {
      instance.empty = jest.fn(() => true);
      rendered.setProps({ showEmpty: false });

      expect(instance.renderView()).toBe(null);
    });

    it('should render empty', () => {
      instance.empty = jest.fn(() => true);
      LOGIC_HELPERS.switchCase = jest.fn();

      instance.renderView();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });

    it('should renderView', () => {
      instance.empty = jest.fn(() => false);
      instance.renderHeader = jest.fn(() => 'renderHeader');

      const snapshot = shallow(<div>{instance.renderEmptyView()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should renderEdit', () => {
      rendered.setState({ mode: INLINE_EDIT_MODE });
      instance.renderEdit = jest.fn(() => 'renderEdit');

      expect(instance.renderDefault()).toBe('renderEdit');
    });

    it('should renderView', () => {
      rendered.setState({ mode: VIEW_MODE });
      instance.renderView = jest.fn(() => 'renderView');

      expect(instance.renderDefault()).toBe('renderView');
    });
  });

  describe('renderCompressed()', () => {
    it('should renderEdit', () => {
      rendered.setState({ mode: INLINE_EDIT_MODE });
      instance.renderEdit = jest.fn(() => 'renderEdit');

      expect(instance.renderCompressed()).toBe('renderEdit');
    });

    it('should renderView', () => {
      rendered.setState({ mode: VIEW_MODE });
      instance.renderView = jest.fn(() => 'renderView');

      expect(instance.renderCompressed()).toBe('renderView');
    });
  });

  describe('renderReadOnly()', () => {
    it('should renderEdit', () => {
      rendered.setState({ mode: INLINE_EDIT_MODE });
      instance.empty = jest.fn(() => true);

      expect(instance.renderReadOnly()).toBe(null);
    });

    it('should renderView', () => {
      rendered.setState({ mode: VIEW_MODE });
      instance.empty = jest.fn(() => false);
      instance.renderView = jest.fn(() => 'renderView');

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBadge()', () => {
    it('should renderEdit', () => {
      rendered.setState({ mode: INLINE_EDIT_MODE });
      instance.empty = jest.fn(() => true);

      expect(instance.renderBadge()).toBe(null);
    });

    it('should renderView', () => {
      rendered.setState({ mode: VIEW_MODE });
      instance.empty = jest.fn(() => false);
      instance.renderView = jest.fn(() => 'renderView');

      const snapshot = shallow(<div>{instance.renderBadge()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render empty', () => {
      rendered.setProps({ nodePath: [] });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      rendered.setProps({ nodePath: ['content'] });
      LOGIC_HELPERS.switchCase = jest.fn();

      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
