import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Content } from '../index';

describe('<Content />', () => {
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
    rendered = shallow(<Content {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Content).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isNewInvitee()', () => {
    it('should return true', () => {
      rendered.setProps({
        pending: false,
        accepted: false,
        owner: 1,
        userId: 2,
      });

      expect(instance.isNewInvitee()).toBe(true);
    });

    it('should return false #1 pending = true', () => {
      rendered.setProps({
        pending: true,
        accepted: false,
        owner: 1,
        userId: 1,
      });

      expect(instance.isNewInvitee()).toBe(false);
    });

    it('should return false #2 accepted = true', () => {
      rendered.setProps({
        pending: false,
        accepted: true,
        owner: 1,
        userId: 1,
      });

      expect(instance.isNewInvitee()).toBe(false);
    });

    it('should return false #3 userId === owner', () => {
      rendered.setProps({
        pending: false,
        accepted: false,
        owner: 1,
        userId: 1,
      });

      expect(instance.isNewInvitee()).toBe(false);
    });
  });

  describe('renderAddPersonalMessage()', () => {
    it('should return empty if not new invitee', () => {
      instance.isNewInvitee = jest.fn(() => false);

      expect(instance.renderAddPersonalMessage()).toBe(null);
    });

    it('should render RTE if is new invitee', () => {
      instance.isNewInvitee = jest.fn(() => true);

      const snapshot = shallow(
        <div>{instance.renderAddPersonalMessage()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('componentDidMount()', () => {
    it('Should validate and update the pendingInvitations parameter ', () => {
      rendered.setProps({
        pendingInvitations: [1, 2],
      });
      instance.componentDidUpdate({ pendingInvitations: [1] });
      expect(instance.validations.invitePending('', 2)).toEqual(
        'This person has a pending invitation.',
      );
    });
    it('Validation should still work as expected', () => {
      rendered.setProps({
        pendingInvitations: [1, 2],
      });
      instance.componentDidUpdate({ pendingInvitations: [1, 2] });
      expect(instance.validations.invitePending('', 3)).toEqual(true);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render readonly if Personal Message', () => {
      rendered.setProps({
        exist: true,
        owner: 1,
        userId: 2,
        accepted: false,
        fromOtherOrg: false,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render readonly if exist', () => {
      rendered.setProps({ exist: true, fromOtherOrg: true });
      instance.renderAddPersonalMessage = jest.fn(
        () => 'renderAddPersonalMessage',
      );

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
