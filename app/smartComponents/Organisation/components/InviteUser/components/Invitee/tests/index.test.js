import { ANIMATION_MAX_INDEX } from 'smartComponents/Organisation/components/InviteUser/components/Invitee/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Invitee } from '../index';

describe('<Invitee />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    email: 'jon@qq.com',
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Invitee {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Invitee).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillMount()', () => {
    beforeEach(() => {
      global.setTimeout = jest.fn(cb => cb && cb());
    });

    it('should call setTimeout when index < ANIMATION_MAX_INDEX', () => {
      rendered.setProps({ noanimate: true, index: ANIMATION_MAX_INDEX - 1 });

      instance.componentWillMount();

      expect(global.setTimeout).toBeCalled();
      expect(global.setTimeout.mock.calls).toMatchSnapshot();

      expect(rendered.state().show).toBe(true);
    });

    it('should call setTimeout when index >= ANIMATION_MAX_INDEX', () => {
      rendered.setProps({ index: ANIMATION_MAX_INDEX });

      instance.componentWillMount();

      expect(global.setTimeout).toBeCalled();
      expect(global.setTimeout.mock.calls).toMatchSnapshot();

      expect(rendered.state().show).toBe(true);
    });
  });

  describe('componentWillUnmount()', () => {
    beforeEach(() => {
      global.clearTimeout = jest.fn();
    });

    it('should call setTimeout when index < 5', () => {
      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
      expect(global.clearTimeout.mock.calls).toMatchSnapshot();
    });
  });
  describe('seeDetail()', () => {
    it('should call setValue', () => {
      rendered.setProps({ token: 'that@guy' });

      instance.seeDetail();

      expect(resaga.setValue).toBeCalledWith({
        seeDetail: 'that@guy',
        fromOrg: true,
      });
    });
  });
  describe('renderStatus()', () => {
    it('should return correctly if fromOtherOrg is true', () => {
      rendered.setProps({ userId: 999, registered: true, fromOtherOrg: true });

      expect(instance.renderStatus()).toMatchSnapshot();
    });
    it('should return correctly if fromOtherOrg is false', () => {
      rendered.setProps({ userId: 999, registered: true, fromOtherOrg: false });

      expect(instance.renderStatus()).toMatchSnapshot();
    });

    it('should return correctly if fromOtherOrg and user is empty is false', () => {
      expect(instance.renderStatus()).toMatchSnapshot();
    });
  });

  describe('renderPersonalMessage()', () => {
    it('should return null', () => {
      expect(instance.renderPersonalMessage()).toBe(null);
    });
    it('should render Personal Message', () => {
      rendered.setProps({ content: 'message' });
      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderUserStatus()', () => {
    it('should return empty if creating is false', () => {
      rendered.setProps({ creating: false });

      expect(instance.renderUserStatus()).toBe('');
    });

    it('should render if creating is true', () => {
      rendered.setProps({ creating: true });
      instance.renderStatus = jest.fn(() => 'renderStatus');

      const snapshot = shallow(<div>{instance.renderUserStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should renderContent if isOwner', () => {
      rendered.setProps({ isOwner: true });
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.renderContent()).toBe('renderContent');
    });

    it('should renderContent if accepted', () => {
      rendered.setProps({ accepted: true });
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.renderContent()).toBe('renderContent');
    });

    it('should renderPending if neither', () => {
      rendered.setProps({ isOwner: false, accepted: false });
      instance.renderContent = jest.fn(() => 'renderPending');

      expect(instance.renderContent()).toBe('renderPending');
    });
  });

  describe('renderPending()', () => {
    it('should renderPending correctly', () => {
      rendered.setProps({ userId: 999, email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderPending()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAccepted()', () => {
    it('should renderAccepted correctly', () => {
      rendered.setProps({ userId: 999, email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderAccepted()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render noanimate', () => {
      rendered.setProps({ noanimate: true });
      instance.renderContent = () => 'renderContent';

      expect(instance.render()).toBe('renderContent');
    });

    it('should render > ANIMATION_MAX_INDEX', () => {
      rendered.setProps({ index: ANIMATION_MAX_INDEX });
      rendered.setState({ show: true });
      instance.renderContent = () => 'renderContent';

      expect(instance.render()).toBe('renderContent');
    });

    it('should render correctly', () => {
      instance.renderContent = () => 'renderContent';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
