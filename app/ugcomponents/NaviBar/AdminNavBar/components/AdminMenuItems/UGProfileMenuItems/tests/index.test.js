/**
 * Created by Yang on 24/2/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { ListItem } from '@material-ui/core';
import toJSON from 'enzyme-to-json';
import { FEEDBACK_EMAIL } from 'appConstants';
import { UGProfileMenuItems } from '../index';
import MenuItem from '../Menu';

const personDetail = {
  photo: 'url',
  email: 'email',
  hasPhoto: true,
  knownAs: 'sum ting wong',
  metaInfo: {
    x: 0.1,
    y: 0.1,
    width: 0.1,
    height: 0.1,
    scale: 2.7,
  },
  fetching: false,
};

const resaga = {
  setValue: jest.fn(),
};
const props = {
  ...personDetail,
  classes: {},
  resaga,
};

const wrapper = shallow(<UGProfileMenuItems {...props} />);

describe('<UGProfileMenuItems />', () => {
  it('should have proper components', () => {
    expect(wrapper.find(ListItem).length).toEqual(3);
    expect(wrapper.find(MenuItem).length).toEqual(0);
  });
  it('should render proper lists', () => {
    const lists = [
      { link: '#', key: 1 },
      { type: 'divider', key: 2 },
      { type: '', key: '6', link: '' },
    ];
    wrapper.setProps({ lists });
    const snapshot = shallow(<div>{wrapper.instance().generateMenu()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });

  it('handle close click', () => {
    const mockOnClose = jest.fn();
    const instance = wrapper.instance();
    wrapper.setProps({ onClose: mockOnClose });
    instance.handleCloseClick();

    expect(mockOnClose).toBeCalled();
  });

  it('should render support link', () => {
    const lists = [{ link: `mailto:${FEEDBACK_EMAIL}`, key: 1 }];
    wrapper.setProps({ lists });
    const snapshot = shallow(<div>{wrapper.instance().generateMenu()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('render even no photo', () => {
    wrapper.setProps({ photo: '' });
    const snapshot = shallow(<div>{wrapper.instance().subheader()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('render even no photo if smDown', () => {
    wrapper.setProps({ photo: '', smDown: true });
    const snapshot = shallow(<div>{wrapper.instance().subheader()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('render even image fetching', () => {
    wrapper.setProps({ photo: '' });
    wrapper.setProps({ fetching: true });
    const snapshot = shallow(<div>{wrapper.instance().subheader()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });
  it('onClick', () => {
    const onClose = jest.fn();
    wrapper.setProps({ onClose });
    wrapper.instance().onClick();
    expect(resaga.setValue).toBeCalled();
    expect(onClose).toBeCalled();
  });
  it('openInterCom', () => {
    const onClose = jest.fn();
    wrapper.setProps({ onClose });
    wrapper.instance().openInterCom();
    expect(resaga.setValue).toBeCalled();
    expect(onClose).toBeCalled();
  });
});
