import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DialogActions, preventDefault } from '../index';
import m from '../messages';

describe('<DialogActions />', () => {
  let rendered;
  beforeEach(() => {
    rendered = shallow(<DialogActions classes={{}} />);
  });

  it('should exists', () => {
    expect(DialogActions).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render confirmButtonNode', () => {
    const props = {
      button: 2,
      type: 'tour',
      template: 'delete',
      confirmButtonNode: <div>Confirm</div>,
      confirmButton: m.confirmDefault.defaultMessage,
    };
    rendered.setProps(props);
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render default', () => {
    const props = {
      button: 2,
      type: 'tour',
      template: 'delete',
      confirmButton: m.confirmDefault.defaultMessage,
      logout: () => {},
    };
    rendered.setProps(props);
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render custom props', () => {
    const props = {
      button: 1,
      type: 'template',
      template: 'delete',
      confirmButton: 'proceed',
      logout: () => {},
    };
    rendered.setProps(props);
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render logoutOnConfirm button', () => {
    const props = {
      button: 2,
      type: 'tour',
      template: 'delete',
      logoutOnConfirm: true,
      confirmButton: m.confirmDefault.defaultMessage,
      logout: () => {},
    };
    rendered.setProps(props);
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('properly calls preventDefault function', () => {
    const mockPreventDefault = jest.fn();
    const e = { preventDefault: mockPreventDefault };
    preventDefault(e);
    expect(mockPreventDefault).toBeCalled();
  });
});
