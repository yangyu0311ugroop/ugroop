import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NameSummary } from '../index';

describe('<NameSummary />', () => {
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
    rendered = shallow(<NameSummary {...props} />);
    instance = rendered.instance();
  });

  describe('isEmpty()', () => {
    it('should return true #1', () => {
      expect(instance.isEmpty('')).toBe(true);
    });
    it('should return false', () => {
      expect(instance.isEmpty('some value')).toBe(false);
    });
  });

  describe('renderView()', () => {
    it('should renderView should return value', () => {
      rendered.setProps({ value: 'some value', description: 'some value' });
      expect(instance.renderView()).toEqual('some value');
    });
    it('should renderView should return description', () => {
      rendered.setState({ descrValue: 'some description' });
      rendered.setProps({ description: 'some description' });
      expect(instance.renderView()).toEqual('some description');
    });
    it('should renderView should return location', () => {
      rendered.setProps({ location: 'some location' });
      const snapshot = shallow(<div>{instance.renderView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderView url', () => {
      rendered.setProps({ url: 'some url' });
      const snapshot = shallow(<div>{instance.renderView()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderView attachment', () => {
      instance.renderAttachment = jest.fn();
      instance.renderView();
      expect(instance.renderAttachment).toBeCalled();
    });
  });

  describe('assignQuillRef', () => {
    it('should return if quillRef is set', () => {
      const ref = {
        getEditor: () => ({
          getText: () => 'editor',
        }),
      };
      instance.quillRef = 'quilref';
      instance.assignQuillRef(ref);
      expect(instance.quillRef).toBe('quilref');
    });
    it('should return if quillRef is set', () => {
      const ref = {
        getEditor: () => ({
          getText: () => 'editor',
        }),
      };
      instance.quillRef = 'quilref';
      instance.assignQuillRef(ref);
      expect(instance.quillRef).toBe('quilref');
    });
    it('should not fail if not a function', () => {
      const ref = {
        getEditor: () => ({
          getText: 'editor',
        }),
      };
      instance.quillRef = 'quilref';
      instance.assignQuillRef(ref);
      expect(instance.quillRef).toBe('quilref');
    });
    it('should return if quillRef.getEditor is not function', () => {
      const ref = { getEditor: 'notAFunction' };
      expect(instance.assignQuillRef(ref)).toBeUndefined();
    });
    it('should return nothing', () => {
      expect(instance.assignQuillRef()).toBeUndefined();
    });
  });
  describe('renderEdit()', () => {
    it('should renderEdit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEdit, [{}, {}]);
    });
  });

  describe('isEmpty', () => {
    it('should render correctly', () => {
      rendered.setProps({ isEmpty: () => true });
      const snapshot = shallow(<div>{instance.isEmpty()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ isEmpty: 'empty' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderRtePlaceHolder', () => {
    it('should render correctly', () => {
      rendered.setProps({ description: 'some string' });
      const snapshot = shallow(<div>{instance.renderRtePlaceHolder()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still render correctly', () => {
      rendered.setProps({ description: null });
      const snapshot = shallow(<div>{instance.renderRtePlaceHolder()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderAttachment', () => {
    it('should render correctly', () => {
      rendered.setProps({ attachmentdescription: 'some string' });
      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still render correctly', () => {
      rendered.setProps({
        attachmentdescription: null,
        attachmentName: 'some string',
      });
      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render text', () => {
    it('should render correctly', () => {
      rendered.setProps({ variant: 'text' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ ellipsis: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
