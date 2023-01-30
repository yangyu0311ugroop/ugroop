import { COMPLETED, PERSONAL, TITLE } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Content } from '../index';

describe('<Content />', () => {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Content {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Content).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ disabled: true, className: 'customClassName' });

      expect(instance.contentClassName('variantClassName')).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('should setValue if the node is personal and if its not included in memberIds', () => {
      rendered.setProps({
        content: '3',
        memberIds: [],
        status: 'personal',
      });
      instance.componentDidMount();
      expect(resaga.setValue).toBeCalled();
    });
    it('should not setValue if the node is persona but it is included in memberIds', () => {
      rendered.setProps({
        content: '3',
        memberIds: [3],
        status: 'personal',
      });
      instance.componentDidMount();
      expect(resaga.setValue).not.toBeCalled();
    });
  });

  describe('handleFormRef()', () => {
    it('should handleFormRef', () => {
      instance.handleFormRef(555);

      expect(instance.form).toBe(555);
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

  describe('discardChanges()  ', () => {
    it('should call finishEdit', () => {
      instance.finishEdit = jest.fn();

      instance.discardChanges({ content: '' });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.finishEdit);
    });

    it('should NOT call finishEdit', () => {
      instance.finishEdit = jest.fn();

      instance.discardChanges({ content: 'content' });

      expect(instance.finishEdit).not.toBeCalled();
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderContent personal', () => {
      rendered.setProps({ status: PERSONAL });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent quote + index + content', () => {
      rendered.setProps({ quote: true, index: 3 });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent index + no content', () => {
      rendered.setProps({ index: 3, content: '' });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeading()', () => {
    it('should renderEditableTextForm', () => {
      rendered.setState({ editing: true });
      instance.renderEditableTextForm = jest.fn(() => 'renderEditableTextForm');

      expect(instance.renderHeading()).toBe('renderEditableTextForm');
    });
  });

  describe('renderTitle()', () => {
    it('should renderTitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });

  describe('renderCompleted()', () => {
    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.renderCompleted()).toBe('renderContent');
    });
  });

  describe('renderUnderline()', () => {
    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.renderUnderline()).toBe('renderContent');
    });
  });

  describe('renderDefault()', () => {
    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should call LOGIC_HELPERS.switchCase', () => {
      rendered.setProps({ variant: TITLE });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      expect(instance.render()).toBe('renderTitle');
    });

    it('should renderCompleted', () => {
      rendered.setProps({ variant: COMPLETED });
      instance.renderCompleted = jest.fn(() => 'renderCompleted');

      expect(instance.render()).toBe('renderCompleted');
    });

    it('should renderDefault', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');

      expect(instance.render()).toBe('renderDefault');
    });
  });

  // inline editable functions
  describe('startEdit()', () => {
    it('should setState', () => {
      rendered.setState({ editing: false });
      instance.stopPropagation = jest.fn();

      instance.startEdit(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().editing).toBe(true);
    });
  });

  describe('finishEdit()', () => {
    it('should setState', () => {
      rendered.setState({ editing: true });
      instance.stopPropagation = jest.fn();

      instance.finishEdit(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().editing).toBe(false);
    });
  });

  describe('stopPropagation()', () => {
    it('should do nothing', () => {
      expect(instance.stopPropagation()).toBe(undefined);
      expect(instance.stopPropagation({})).toBe(undefined);
    });

    it('should call event.stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };
      rendered.setProps({ stopPropagation: true });

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('changeContent()', () => {
    it('should NOT call dispatchTo #1', () => {
      instance.finishEdit = jest.fn();
      rendered.setProps({ content: 'content' });
      instance.changeContent({ content: 'content' });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.finishEdit);
    });

    it('should NOT call dispatchTo #2', () => {
      instance.finishEdit = jest.fn();
      rendered.setProps({ content: undefined });
      instance.changeContent({ content: false });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.finishEdit);
    });

    it('should NOT call dispatchTo #3', () => {
      rendered.setProps({ content: 'content', updatingNode: true });

      expect(instance.changeContent({ content: 'new content' })).toBe(null);
    });

    it('should call dispatchTo', () => {
      instance.changeContent({ content: 'content' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('changeEditableContent()', () => {
    it('should call dispatchTo', () => {
      instance.changeEditableContent({ model: { content: 'content' } });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderEditableTextForm()', () => {
    it('should render EditableTextForm', () => {
      instance.canExecute = jest.fn(() => true);
      rendered.setProps({ bold: true, nowrap: true, editable: true });
      const snapshot = shallow(
        <div>{instance.renderEditableTextForm('H1', true)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable()', () => {
    it('should return renderContent', () => {
      rendered.setProps({ editable: false });
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.renderEditable()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderEditable', () => {
      rendered.setProps({ editable: true });
      instance.canExecute = jest.fn(() => true);
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.renderEditable()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ updatingNode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });

    it('should renderButtons', () => {
      rendered.setProps({ updatingNode: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });
  });

  describe('renderEditContent()', () => {
    it('should renderEditContent', () => {
      rendered.setProps({ multiline: true });
      const snapshot = shallow(<div>{instance.renderEditContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLinkContent()', () => {
    it('should renderEditContent', () => {
      const snapshot = shallow(<div>{instance.renderLink()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderProp()', () => {
    it('should renderEditContent', () => {
      rendered.setProps({ children: jest.fn(() => 'Content') });
      const snapshot = shallow(<div>{instance.renderProp()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderValue()', () => {
    it('should renderValue', () => {
      rendered.setProps({ children: jest.fn(() => 'Content') });
      const snapshot = shallow(<div>{instance.renderValue()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTextOnly()', () => {
    it('should renderEditContent', () => {
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render a truncated text given the truncateLength', () => {
      rendered.setProps({
        content:
          'a very  very very very very very very very very very very very very  very long text',
      });
      rendered.setProps({
        truncateLength: 40,
      });
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should return SimpleRTE', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
