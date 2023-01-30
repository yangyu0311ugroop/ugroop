import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { EditableFolderForm } from '../index';

import styles from '../styles';

const mockStyles = mockStylesheet('EditableFolder', styles, theme);

describe('<EditableFolderForm />', () => {
  let rendered;
  let instance;

  const props = {
    classes: mockStyles,
    intl: {
      formatMessage: jest.fn(),
    },
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    currFolderId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<EditableFolderForm {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('componentWillReceiveProps', () => {
    it('should change name state if initContent props is different', () => {
      const expected =
        'I am saved by grace alone through faith alone in Christ alone';
      rendered.setProps({
        initContent: expected,
      });

      expect(rendered.state().name).toBe(expected);
    });
  });

  describe('onSubmit()', () => {
    const name = "Don't reject the salvation offered in Jesus Christ";
    it('should exist', () => {
      expect(instance.onSubmit).toBeDefined();
    });
    it('should call dispatchTo given the parentNodeId and content if loading is false and content is not the same as old and isValid state is true', () => {
      const folderId = 15;
      const expected = {
        payload: {
          type: 'folder',
          content: name,
          parentNodeId: folderId,
        },
        onSuccess: instance.onAddSuccess,
        onError: instance.onAddError,
      };
      rendered.setProps({
        currFolderId: folderId,
      });
      rendered.setState({
        isValid: true,
      });
      instance.onSubmit({
        folderName: name,
      });
      expect(props.onSubmit).toBeCalledWith({ form: expected });
    });
    it('should not call dispatchTo given the parentNodeId and content if loading is true', () => {
      const folderId = 15;
      rendered.setProps({
        currFolderId: folderId,
      });
      rendered.setState({
        loading: true,
      });
      instance.onSubmit({
        folderName: name,
      });
      expect(props.onSubmit).not.toBeCalled();
    });
    it('should not call dispatchTo given the parentNodeId and content if old content is same with new content', () => {
      const folderId = 15;
      rendered.setProps({
        currFolderId: folderId,
      });
      rendered.setProps({
        initContent: name,
      });
      rendered.setState({
        loading: true,
      });
      instance.onSubmit({
        folderName: name,
      });
      expect(props.onSubmit).not.toBeCalled();
    });
  });

  describe('onValid()', () => {
    it('should set isValid state to true', () => {
      rendered.setState({
        isValid: false,
      });
      instance.onValid();
      expect(rendered.state().isValid).toBe(true);
    });
  });

  describe('onInvalid()', () => {
    it('should set isValid state is false', () => {
      rendered.setState({
        isValid: true,
      });
      instance.onInvalid();
      expect(rendered.state().isValid).toBe(false);
    });
  });

  describe('onAddSuccess()', () => {
    it('should set loading state to false and name to blank', () => {
      rendered.setState({
        loading: true,
        name: '',
      });
      instance.onAddSuccess();
      expect(rendered.state().loading).toBe(false);
      expect(rendered.state().name).toBe('');
    });
  });

  describe('onAddError', () => {
    it('should revert the name state back to initial content + make loading state to false', () => {
      rendered.setState({
        loading: true,
        name: 'asdasd',
      });
      instance.onAddError();
      expect(rendered.state().name).toBe('');
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('onChange()', () => {
    it('should change state of name based on value of textfield', () => {
      const expected =
        'Die in your sin or let your sin be carried by Jesus Christ';
      instance.onChange(expected);
      expect(rendered.state().name).toBe(expected);
    });
  });

  describe('onCancel()', () => {
    it('should set the state of name to blank', () => {
      const expected = 'qweqwe';
      rendered.setState({
        name: expected,
      });
      expect(rendered.state().name).not.toBe('');
      instance.onCancel();
      expect(rendered.state().name).not.toBe(expected);
      expect(rendered.state().name).toBe('');
    });
  });

  describe('renderSaveBtn', () => {
    it('should render loading if loading is true', () => {
      rendered.setState({
        loading: true,
        isValid: true,
        name: 'name',
      });
      rendered.setProps({
        initContent: 'initContent',
      });

      const snapshot = shallow(<div>{instance.renderSaveBtn()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
