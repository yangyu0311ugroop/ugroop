import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PeopleWrapper } from '../index';

describe('<PeopleWrapper />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<PeopleWrapper {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PeopleWrapper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('componentDidUpdate()', () => {
    it('should fetch data', () => {
      rendered.setProps({ orgId: 1, orgPeopleIds: [1] });
      instance.fetchOrgMemeber = jest.fn();
      instance.componentDidUpdate({ orgId: 1 });
      expect(instance.fetchOrgMemeber).not.toBeCalled();

      // expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should fetch data', () => {
      rendered.setProps({ orgId: 1, orgPeopleIds: [] });
      instance.fetchOrgMemeber = jest.fn();
      instance.componentDidUpdate({ orgId: 0 });
      expect(instance.fetchOrgMemeber).toBeCalled();

      // expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('componentDidMount()', () => {
    it('should fetch data', () => {
      rendered.setProps({ orgId: 1, orgPeopleIds: [] });
      instance.fetchOrgMemeber = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchOrgMemeber).toBeCalled();

      // expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should fetch data', () => {
      rendered.setProps({ orgId: 1, orgPeopleIds: [] });
      instance.fetchOrgMemeber = jest.fn();
      instance.componentDidMount();
      expect(instance.fetchOrgMemeber).toBeCalled();

      // expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('showMore()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.showMore()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderInvOrg()', () => {
    it('should render correctly', () => {
      rendered.setProps({ ownOrgRole: 'member' });
      const snapshot = shallow(<div>{instance.renderInvOrg('test')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ ownOrgRole: 'owner' });
      const snapshot = shallow(<div>{instance.renderInvOrg('test')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ ownOrgRole: 'owner', orgPendingIds: [1] });
      const snapshot = shallow(<div>{instance.renderInvOrg('test')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderMoreButton()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderMoreButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('fetchDone()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.fetchDone()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('openInviteUser()', () => {
    it('pendingInviteDialog should be false', () => {
      instance.openInviteUser();
      expect(rendered.state().inviteUserDialog).toBe(true);
    });
    it('onCloseModal should be false', () => {
      instance.onCloseModal();
      expect(rendered.state().inviteUserDialog).toBe(false);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({
        userIds: [1],
        orgPeopleIds: [1, 2],
        showConnected: false,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ userIds: [1], orgPeopleIds: [1, 2] });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({
        userIds: [1],
        orgPeopleIds: [1, 2, 3, 4, 5, 6],
        showConnected: false,
        createdBy: 6,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ userIds: [1], orgPeopleIds: [1] });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.isMinimise = jest.fn(() => true);
      rendered.setProps({ orgPeopleIds: [1], selectedId: 1 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.isMinimise = jest.fn(() => true);
      rendered.setProps({ orgPeopleIds: [1, 2, 3, 4], selectedId: false });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
