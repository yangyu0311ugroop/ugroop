import { ability } from 'apis/components/Ability/ability';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { GET_ATTACHMENT, NODE_API, REMOVE_ATTACHMENT } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Section } from '../index';

describe('<Section />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<Section {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Section).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps', () => {
      rendered.setProps({ editable: true });
      instance.finishEdit = jest.fn(() => 'finishEdit');

      instance.componentWillReceiveProps({ editable: false });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.finishEdit);
    });
  });

  describe('handleDataChange', () => {
    it('should call setValue', () => {
      instance.handleDataChange('key')('value');
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('saveChanges()', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => 123123);
    });

    it('should NOT call dispatchTo if !dirty', () => {
      rendered.setProps({ dirty: false });
      instance.finishEdit = jest.fn();

      instance.saveChanges({});

      expect(resaga.dispatchTo).not.toBeCalled();
      expect(instance.finishEdit).toBeCalledWith();
    });

    it('should call dispatchTo if dirty with description', () => {
      rendered.setProps({ dirty: true, description: 'abc' });

      instance.saveChanges({ editContent: '123', editLocation: '456' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call dispatchTo if dirty without description', () => {
      rendered.setProps({ dirty: true, description: '', photo: [] });

      instance.saveChanges({ editContent: '123', editLocation: '456' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should add photo.id', () => {
      rendered.setProps({
        dirty: true,
        description: '',
        photo: { id: 123, content: '123' },
      });

      instance.saveChanges({ editContent: '123', editLocation: '456' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should generate photo.id', () => {
      rendered.setProps({
        dirty: true,
        description: '',
        photo: { content: '123' },
      });

      instance.saveChanges({ editContent: '123', editLocation: '456' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should update attachment with attachmentId', () => {
      rendered.setProps({
        dirty: true,
        attachmentId: 999123,
        attachment: { name: 'abc' },
        attachmentDescription: null,
      });

      instance.saveChanges({ fileDescription: 'abc' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should update attachment without attachmentId', () => {
      rendered.setProps({ dirty: true, attachmentDescription: 'ccc' });

      instance.saveChanges({});

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('finishEdit()', () => {
    it('should call setValue', () => {
      rendered.setProps({ id: 123 });
      sections.remove = jest.fn();

      instance.finishEdit();

      expect(sections.remove).toBeCalledWith(123);
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleClick()', () => {
    it('should handleClick', () => {
      instance.handleClick();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('canEdit()', () => {
    it('should return true', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editing: true });

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('handleAttachment()', () => {
    it('should call remove dispatchTo', () => {
      const payload = { id: 1, isSection: true };
      rendered.setProps({ attachmentId: 123, id: 1 });
      instance.handleAttachment({ canDelete: true })();
      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, REMOVE_ATTACHMENT, {
        payload,
        onSuccess: instance.finishEdit,
        onError: instance.finishEdit,
      });
    });
    it('should call fetch dispatchTo', () => {
      const payload = { id: 1 };
      rendered.setProps({ id: 1 });
      instance.handleAttachment({ createAttachment: true })();
      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, GET_ATTACHMENT, {
        payload,
        onSuccess: instance.finishEdit,
        onError: instance.finishEdit,
      });
    });
    it('should call finishEdit', () => {
      instance.finishEdit = jest.fn();
      instance.handleAttachment({})();
      expect(instance.finishEdit).toBeCalled();
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });
  });

  describe('render()', () => {
    it('should NOT render if NOT exist', () => {
      rendered.setProps({ exist: 0 });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderBody', () => {
      rendered.setProps({ exist: 123, batchEditing: false });
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderBody with form', () => {
      rendered.setProps({ exist: 123, batchEditing: true });
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render empty', () => {
      rendered.setProps({ exist: 123, isPublic: true, isEmpty: true });
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
