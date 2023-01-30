import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { EditableForm } from '../index';

import styles from '../styles';

const mockStyles = mockStylesheet('EditableFolder', styles, theme);

describe('<EditableForm />', () => {
  let rendered;
  let instance;

  const props = {
    classes: mockStyles,
    intl: {
      formatMessage: jest.fn(),
    },
    onSave: jest.fn(),
    onCancel: jest.fn(),
    folderId: 1,
    value: 'I am saved by grace alone through faith alone in Christ alone',
  };

  beforeEach(() => {
    rendered = shallow(<EditableForm {...props} />);
    instance = rendered.instance();
  });

  describe('componentWillReceiveProps', () => {
    it('should change name state if initContent props is different', () => {
      const expected =
        'I am saved by grace alone through faith alone in Christ alone';
      rendered.setProps({
        initContent: expected,
      });

      expect(rendered.state().value).toBe(expected);
    });
    it('should change name state if initContent props is equal', () => {
      const expected =
        'I am saved by grace alone through faith alone in Christ alone';
      rendered.setProps({
        initContent: expected,
      });

      instance.componentWillReceiveProps(expected);

      expect(rendered.state().value).not.toBe(expected);
    });
  });

  describe('onChange()', () => {
    it('should change state of name based on value of textfield', () => {
      const expected =
        'Die in your sin or let your sin be carried by Jesus Christ';
      instance.onChange(expected);
      expect(rendered.state().value).toBe(expected);
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

  describe('onSave', () => {
    beforeEach(() => {
      instance.onSuccess = 1;
      instance.onError = 1;
    });
    it('should call onSave props with data if loading state is false', () => {
      rendered.setState({
        value: 'aa',
      });
      instance.onSave({ addFolderListView: 'aaa' });
      expect(props.onSave).toBeCalledWith({
        form: {
          payload: {
            parentNodeId: props.folderId,
            content: 'aaa',
            type: 'folder',
          },
          onSuccess: 1,
          onError: 1,
        },
      });
    });
  });

  describe('onSuccess', () => {
    it('should setState value to nothing and loading to false', () => {
      instance.onSuccess();
      expect(rendered.state().value).toEqual('');
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('onSuccess', () => {
    it('should setState loading to false', () => {
      instance.onError();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('createFormRef', () => {
    it('should assign to form internal variable whatever was being passed as parameter', () => {
      instance.createFormRef(1);
      expect(instance.form).toBe(1);
    });
  });

  describe('onBtnClicked', () => {
    it('should call the submit function of the form reference', () => {
      const form = { submitForm: jest.fn() };
      instance.form = form;
      instance.onBtnClicked();
      expect(form.submitForm).toBeCalled();
    });
  });

  describe('renderButtons', () => {
    it('should return saveBtn if isValid and state value !== props value', () => {
      rendered.setProps({
        value: 'val',
      });
      rendered.setState({
        isValid: true,
        value: '',
      });

      const snapshot = shallow(<div>{instance.renderButtons()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
