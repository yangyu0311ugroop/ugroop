import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ShareList } from '../index';

describe('<ShareList />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ShareList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ShareList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should not do anything', () => {
      rendered.setProps({ onClose: undefined });

      expect(instance.handleClose()).toBe(DO_NOTHING);
    });

    it('should call props.onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });

      instance.handleClose();

      expect(onClose).toBeCalledWith();
    });
  });

  describe('inviteFromOrg()', () => {
    it('should set state to false', () => {
      rendered.setState({ inviteFromOrg: true });

      instance.inviteFromOrg(true);
      expect(rendered.state().inviteFromOrg).toEqual(true);
    });
    it('should set state to true', () => {
      rendered.setState({ inviteFromOrg: false });

      instance.inviteFromOrg(true);
      expect(rendered.state().inviteFromOrg).toEqual(false);
    });
  });
  describe('orgMenuClick()', () => {
    it('should orgMenuClick', () => {
      instance.orgMenuClick(1)();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('inviteFromOrg()', () => {
    it('should inviteFromOrg', () => {
      instance.inviteFromOrg(false)();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('renderMobile()', () => {
    it('should render correctly', () => {
      rendered.setProps({ orgUserIds: [1] });
      const snapshot = shallow(<div>{instance.renderMobile()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render normally', () => {
      rendered.setProps({ orgUserIds: [1] });
      rendered.setState({ inviting: true });
      const snapshot = shallow(<div>{instance.renderMobile()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ shareListFilter: 'orgMember' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
