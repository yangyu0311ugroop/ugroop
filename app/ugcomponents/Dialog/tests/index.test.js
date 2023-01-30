import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UGDialog } from '../index';

describe('<UGDialog />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<UGDialog classes={{}} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UGDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should custom dialog', () => {
    const customChildren = { dialog: <div /> };
    rendered.setProps({ customChildren });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render custom dialog children', () => {
    const customChildren = { action: <div />, title: <div /> };
    rendered.setProps({ customChildren });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render dialog with no headline if hideHeadline prop is true', () => {
    const customChildren = { action: <div />, title: <div /> };
    rendered.setProps({ customChildren, hideHeadline: true });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('generateDialogActions()', () => {
    rendered.setProps({ button: 0 });
    expect(instance.generateDialogActions()).toBe(null);
  });
});
