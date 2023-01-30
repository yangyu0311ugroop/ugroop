Date.now = jest.fn(() => 42);
jest.useFakeTimers();
/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { EMPTY_RTE } from 'appConstants';
import mockStylesheet from 'utils/mockStylesheet';
import { UGRichEditor, stylesheet } from '../index';

const mockStyle = mockStylesheet('UGRichTextEditor', stylesheet);
const initialContent = 'abcd';
describe('UGRichTextEditor component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <UGRichEditor
        toolBarId="toolid"
        classes={mockStyle}
        initContent={initialContent}
      />,
    );
  });

  it('should render something', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  describe('componentWillMount', () => {
    it('should use createWithContent when initContent props is existsing', () => {
      const expectedResult = 'content';
      wrapper.setProps({
        initContent: expectedResult,
        classes: stylesheet,
      });
      wrapper.instance().componentWillMount();
      wrapper.update();
      const actualResult = wrapper.state().value;
      expect(actualResult).toEqual(expectedResult);
    });
    it('should only use createEmpty when initContent props does not exist', () => {
      const expectedResult = '';
      wrapper.setProps({
        initContent: '',
        classes: stylesheet,
      });
      wrapper.instance().componentWillMount();
      expect(wrapper.state().value).toEqual(expectedResult);
    });
  });
  describe('handleValueRef()', () => {
    it('should return readOnly', () => {
      wrapper.instance().handleValueRef(123);

      expect(wrapper.instance().attachments).toBe(123);
    });
  });
  describe('imageHandler() should not explode', () => {
    it('should return null', () => {
      wrapper.instance().imageHandler();
    });
    it('should return value', () => {
      wrapper.instance().quillRef = {
        getSelection: jest.fn(),
        insertEmbed: jest.fn(),
      };
      wrapper.instance().imageHandler(1, { link: 'ugroop' });
    });
    it('should return value range index', () => {
      wrapper.instance().quillRef = {
        getSelection: jest.fn(() => ({ range: { index: 1 } })),
        insertEmbed: jest.fn(),
      };
      wrapper.instance().imageHandler(1, { link: 'ugroop' });
    });
    it('should return value a', () => {
      wrapper.instance().imageHandler(1, { a: '' });
    });
  });
  describe('componentWillReceiveProps', () => {
    it('should override the current state when value is changed', () => {
      const expectedResult = 'qweqwe';
      const expected = 'qweqwe';
      wrapper.setProps({
        initContent: expected,
        classes: stylesheet,
      });
      wrapper.update();
      const actualResult = wrapper.state().value;
      expect(actualResult).toEqual(expectedResult);
    });
    it('should call onSetContentState when initContent is undefined or null', () => {
      const mockOnContentState = jest.fn();

      wrapper.instance().onSetContentState = mockOnContentState;
      wrapper.setProps({
        initContent: undefined,
      });
      wrapper.instance().componentWillReceiveProps({ initContent: '111' });
      expect(mockOnContentState).toBeCalled();

      wrapper.setProps({
        initContent: null,
      });
      wrapper.instance().componentWillReceiveProps({ initContent: '111' });
      expect(mockOnContentState).toBeCalled();
    });
    it('should not call onSetContentState when next and this initContent are same', () => {
      const mockOnContentState = jest.fn();
      wrapper.instance().onSetContentState = mockOnContentState;
      wrapper.instance().componentWillReceiveProps({
        toolBarId: 'toolid',
        initContent: initialContent,
      });
      expect(mockOnContentState).not.toBeCalled();
    });
  });
  describe('componentDidMount', () => {
    it('shall call attachQuillRefs ', () => {
      const instance = wrapper.instance();
      instance.attachQuillRefs = jest.fn();
      instance.componentDidMount();
      expect(instance.attachQuillRefs).toBeCalled();
    });
  });
  describe('onContentState', () => {
    it('should change state value depending on the param being passed', () => {
      const expectedResult = 'abcd';
      wrapper.instance().reactQuillRef = {
        getEditor: {},
      };
      wrapper.instance().onSetContentState('abcd');
      const actualResult = wrapper.state().value;
      expect(actualResult).toEqual(expectedResult);
    });
    it('should change state value even if the param passed is ordinary string', () => {
      const sampleString = 'Jesus is the only way to eternal life';
      const expectedResult = sampleString;
      wrapper.instance().reactQuillRef = {
        getEditor: {},
      };
      wrapper.instance().onSetContentState(sampleString);
      const actualResult = wrapper.state().value;
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('onChange', () => {
    it('should not call props onChange', () => {
      const onChange = jest.fn();
      const initVal = 'value';
      wrapper.setProps({
        onChange,
      });
      wrapper.instance().onChange(initVal);
      expect(onChange).not.toBeCalled();
    });
    it('should return stringified contentState', () => {
      const onChange = jest.fn();
      const initVal = 'value';
      wrapper.setProps({
        onChange,
      });
      wrapper.instance().reactQuillRef = {
        getEditor: {},
        editor: {
          getText: jest.fn(() => 'qqq'),
        },
      };
      wrapper.instance().onChange(initVal);
      expect(onChange).toBeCalledWith(initVal, { plainText: 'qqq' });
    });
  });
  describe('readOnly props', () => {
    it('should have another state when readOnly props is true', () => {
      wrapper.setProps({ readOnly: true });
      wrapper.setState({ value: EMPTY_RTE });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
  describe('assignReactQuillRef', () => {
    it('should assign ref correctly', () => {
      const instance = wrapper.instance();
      instance.assignReactQuillRef('somethingRef');
      expect(instance.reactQuillRef).toBe('somethingRef');
    });
  });
  describe('attachQuillRefs', () => {
    it('should return if quillRef is set', () => {
      const instance = wrapper.instance();
      instance.reactQuillRef = { getEditor: () => 'editor' };
      instance.quillRef = 'quilref';
      instance.attachQuillRefs();
      expect(instance.quillRef).toBe('quilref');
    });
    it('should return if quillRef is set correctly', () => {
      const instance = wrapper.instance();
      instance.reactQuillRef = { getEditor: () => 'editor' };
      instance.attachQuillRefs();
      expect(instance.quillRef).toBe('editor');
    });
    it('should return if quillRef is null', () => {
      const instance = wrapper.instance();
      instance.reactQuillRef = { getEditor: () => null };
      instance.attachQuillRefs();
      expect(instance.quillRef).toBeNull();
    });
    it('should return if quillRef.getEditor is not function', () => {
      const instance = wrapper.instance();
      instance.reactQuillRef = { getEditor: 'notAFunction' };
      instance.quillRef = 'quilref';
      expect(instance.attachQuillRefs()).toBeUndefined();
    });
  });
  describe('insertEmoij', () => {
    it('should execute correctly', () => {
      const instance = wrapper.instance();
      instance.quillRef = {
        getSelection: jest.fn(),
        insertText: jest.fn(),
      };
      instance.insertEmoij('test');
      jest.runAllTimers();
      expect(instance.quillRef.insertText).toBeCalledWith(
        0,
        'test',
        '',
        '',
        null,
        'api',
      );
    });
    it('should execute correctly', () => {
      const instance = wrapper.instance();
      instance.quillRef = {
        getSelection: jest.fn(() => ({ index: 2 })),
        insertText: jest.fn(),
      };
      instance.insertEmoij('test2');
      jest.runAllTimers();
      expect(instance.quillRef.insertText).toBeCalledWith(
        2,
        'test2',
        '',
        '',
        null,
        'api',
      );
    });
  });

  describe('UGRichEditor.defaultProps', () => {
    it('onChange returns undefined', () => {
      expect(UGRichEditor.defaultProps.onChange()).toBeUndefined();
    });
  });
});
