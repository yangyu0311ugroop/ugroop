/**
 * Created by edil on 8/8/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { UGImageInput } from '../index';
const mockSetValueOnChange = jest.fn();
const mockresetInput = jest.fn();
const mockOnLoad = jest.fn();
const mockReadAsDataURL = jest.fn();
const styles = {
  hidden: {
    flex: 1,
    padding: 0,
    opacity: 0,
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
  },
};

const imageInputProps = {
  setValueOnChange: mockSetValueOnChange,
  shouldReset: 0,
  classes: styles,
  fileId: 'myfileId',
};
const wrapper = shallow(<UGImageInput {...imageInputProps} />);

describe('<ImageInput />', () => {
  it('should render something', () => {
    expect(wrapper.render()).toBeDefined();
  });
  it('should call setValueOnChange props', () => {
    const data = 'test';
    const blob = new Blob([data], { type: 'image/jpeg' });
    const mockEvent = {
      target: { files: [blob] },
      preventDefault: jest.fn(),
    };
    const readAsText = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => {
      evtHandler();
    });
    const dummyFileReader = {
      addEventListener,
      readAsText,
      readAsDataURL: jest.fn(),
    };
    window.FileReader = jest.fn(() => dummyFileReader);
    wrapper.find('input').simulate('change', mockEvent);
    dummyFileReader.onload();
    expect(mockEvent.preventDefault).toBeCalled();
    expect(mockSetValueOnChange).toBeCalled();
  });
  it('should render correct file Id', () => {
    expect(wrapper.find('#myfileId').length).toEqual(1);
  });
  it('with ResetInput', () => {
    const renderedComponent = shallow(<UGImageInput {...imageInputProps} />);
    const component = renderedComponent.instance();
    component.state.value = 'dummy';
    component.resetInput();
    expect(component.state.value).toBe('');
  });
  it('onChange with data', () => {
    const data = 'test';
    const blob = new Blob([data], { type: 'image/' });
    const fileData = {
      target: {
        files: [blob],
      },
      preventDefault: () => {},
    };
    const renderedComponent = shallow(<UGImageInput {...imageInputProps} />);
    renderedComponent.state.reader = {
      onload: mockOnLoad,
      readAsDataURL: mockReadAsDataURL,
    };
    const component = renderedComponent.instance();
    component.onChange(fileData);
  });
  it('onChange with not data', () => {
    const fileData = {
      target: {
        files: [],
      },
      preventDefault: () => {},
    };
    const renderedComponent = shallow(<UGImageInput {...imageInputProps} />);
    const component = renderedComponent.instance();
    component.onChange(fileData);
  });
});

describe('ImageInput componentWillReceiveProps', () => {
  it('with Data Changes', () => {
    const renderedComponent = shallow(<UGImageInput {...imageInputProps} />);
    const component = renderedComponent.instance();
    component.resetInput = mockresetInput;
    component.componentWillReceiveProps({ shouldReset: 1 });
    expect(mockresetInput).toBeCalled();
  });
  it('with no Data Changes', () => {
    const renderedComponent = shallow(<UGImageInput {...imageInputProps} />);
    const component = renderedComponent.instance();
    component.resetInput = mockresetInput;
    component.componentWillReceiveProps({ shouldReset: 0 });
  });
});
