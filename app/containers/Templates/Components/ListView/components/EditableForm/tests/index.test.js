import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EditableForm } from '../index';

describe('<EditableForm />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    intl: {
      formatMessage: jest.fn(),
    },
    onSave: jest.fn(),
    onChange: jest.fn(),
    onKeyPress: jest.fn(),
    onClose: jest.fn(),
    folderId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<EditableForm {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditableForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render check icon if props value is not blank', () => {
    rendered.setProps({
      value: 'qweqwe',
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render loading icon if isAddItemLoading is true', () => {
    rendered.setProps({
      isAddItemLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('componentWillReceiveProps', () => {
    it('should set state value if new props is different from the past props', () => {
      instance.componentWillReceiveProps({
        value: 'To live is Christ, to die is gain',
      });
      expect(rendered.state().value).toBe('To live is Christ, to die is gain');
    });
    it('should not set state value if new props is same with the past prop', () => {
      rendered.setState({
        value: 'To live is Christ, to die is gain',
      });
      instance.componentWillReceiveProps({
        value: 'To live is Christ, to die is gain',
      });
      expect(rendered.state().value).toBe('To live is Christ, to die is gain');
    });
  });

  describe('onChange', () => {
    it('should set value state based on the value passed on in the event', () => {
      instance.onChange('To live is Christ, to die is gain');
      expect(rendered.state().value).toBe('To live is Christ, to die is gain');
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
    it('should not call onSave props with data if loading state is true', () => {
      rendered.setState({
        loading: true,
      });
      instance.onSave({ addFolderListView: '' });
      expect(props.onSave).not.toBeCalled();
    });
    it('should not call onSave props with data if state value is same with the old value', () => {
      rendered.setState({
        loading: true,
      });
      rendered.setProps({
        value: '',
      });
      instance.onSave({ addFolderListView: '' });
      expect(props.onSave).not.toBeCalled();
    });
  });

  describe('onError', () => {
    it('should set loading state to false', () => {
      rendered.setState({
        loading: true,
      });
      instance.onError();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('onValid', () => {
    it('should set isValid state to true', () => {
      rendered.setState({
        isValid: false,
      });
      instance.onValid();
      expect(rendered.state().isValid).toBe(true);
    });
  });

  describe('onInvalid', () => {
    it('should set isValid state to false', () => {
      rendered.setState({
        isValid: true,
      });
      instance.onInvalid();
      expect(rendered.state().isValid).toBe(false);
    });
  });

  describe('onSuccess', () => {
    it('should make the state value to blank', () => {
      rendered.setState({
        value: 'To live is Christ, to die is gain',
      });
      instance.onSuccess();
      expect(rendered.state().value).toBe('');
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

  describe('createFormRef', () => {
    it('should assign to form internal variable whatever was being passed as parameter', () => {
      instance.createFormRef(1);
      expect(instance.form).toBe(1);
    });
  });
});
