import { DO_NOTHING } from 'appConstants';
import { RECEIVED, SENT } from 'datastore/invitationStore/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Received from '../components/Received';
import Sent from '../components/Sent';
import { Content } from '../index';

describe('<Content />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    viewStore: 'someStore',
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

  describe('handleMouseOver()', () => {
    it('should set state', () => {
      rendered.setState({ mouseOver: '' });

      instance.handleMouseOver('some token')();

      expect(rendered.state().mouseOver).toBe('some token');
    });
  });

  describe('handleMouseOut()', () => {
    it('should not setState if seeDetail', () => {
      rendered.setProps({ seeDetail: 'that token' });

      expect(instance.handleMouseOut()()).toBe(DO_NOTHING);
    });

    it('should setState otherwise', () => {
      rendered.setState({ mouseOver: 'some token' });
      rendered.setProps({ seeDetail: '' });

      instance.handleMouseOut()();

      expect(rendered.state().mouseOver).toBe('');
    });
  });

  describe('seeDetail()', () => {
    it('should call setValue', () => {
      instance.seeDetail('some token')();

      expect(resaga.setValue).toBeCalledWith({ seeDetail: 'some token' });
    });
  });

  describe('wrapperClassName()', () => {
    it('should render all 3 classnames', () => {
      rendered.setProps({
        classes: {
          invitationItem: 'invitationItem',
          invitationItemHover: 'invitationItemHover',
          invitationNotLastItem: 'invitationNotLastItem',
        },
        type: 'transfers',
      });
      rendered.setState({ mouseOver: 'this token' });

      expect(
        instance.wrapperClassName({ token: 'this token', isLast: false }),
      ).toMatchSnapshot();
    });
    it('should render all 4 classnames', () => {
      rendered.setProps({
        classes: {
          invitationItem: 'invitationItem',
          invitationItemHover: 'invitationItemHover',
          invitationNotLastItem: 'invitationNotLastItem',
        },
      });
      rendered.setState({ mouseOver: 'this token' });

      expect(
        instance.wrapperClassName({ token: 'this token', isLast: true }),
      ).toMatchSnapshot();
    });
  });

  describe('renderActionButtons()', () => {
    it('should return null if mouseOver !== token', () => {
      rendered.setState({ mouseOver: 'otherToken' });

      expect(instance.renderActionButtons('thisToken')).toBe(null);
    });

    it('should render action buttons', () => {
      rendered.setState({ mouseOver: 'thisToken' });

      const snapshot = shallow(
        <div>{instance.renderActionButtons('thisToken')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderInvitationWrapper()', () => {
    it('should render wrapper', () => {
      instance.wrapperClassName = jest.fn(() => 'wrapperClassName');
      instance.renderActionButtons = jest.fn(() => 'renderActionButtons');

      const snapshot = shallow(
        <div>
          {instance.renderInvitationWrapper({
            token: 'that token',
            previousToken: 'other token',
            isFirst: false,
            isLast: true,
            render: 'render something',
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      const snapshot = shallow(<div>{instance.renderEmpty()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderInvitation()', () => {
    it('should renderInvitation without previousToken', () => {
      instance.renderInvitationWrapper = jest.fn(
        () => 'renderInvitationWrapper',
      );

      expect(
        instance.renderInvitation(['this token', 'that token'], Received)(
          'this token',
          0,
        ),
      ).toBe('renderInvitationWrapper');

      expect(instance.renderInvitationWrapper).toBeCalled();
      expect(instance.renderInvitationWrapper.mock.calls).toMatchSnapshot();
    });

    it('should renderInvitation with previousToken', () => {
      instance.renderInvitationWrapper = jest.fn(
        () => 'renderInvitationWrapper',
      );

      expect(
        instance.renderInvitation(['this token', 'that token'], Sent)(
          'that token',
          1,
        ),
      ).toBe('renderInvitationWrapper');

      expect(instance.renderInvitationWrapper).toBeCalled();
      expect(instance.renderInvitationWrapper.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should renderEmpty', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderContent([], Received)).toBe('renderEmpty');

      expect(instance.renderEmpty).toBeCalledWith();
    });

    it('should render empty children', () => {
      const children = jest.fn(() => 'children');

      rendered.setProps({ children });

      expect(instance.renderContent([])).toBe('children');
    });

    it('should call renderInvitation', () => {
      instance.renderInvitation = jest.fn(() =>
        jest.fn(() => 'renderInvitation'),
      );

      expect(instance.renderContent([1, 2, 3], Received)).toEqual([
        'renderInvitation',
        'renderInvitation',
        'renderInvitation',
      ]);

      expect(instance.renderInvitation).toBeCalled();
      expect(instance.renderInvitation.mock.calls).toMatchSnapshot();
    });

    it('should render children', () => {
      const children = jest.fn(() => 'children');

      rendered.setProps({ children });

      expect(instance.renderContent([1, 2, 3], Received)).toBe('children');
    });
  });

  describe('render()', () => {
    it('should render fetching', () => {
      rendered.setProps({ fetching: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderContent received', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ show: RECEIVED, received: ['received'] });

      expect(instance.render()).toBe('renderContent');

      expect(instance.renderContent).toBeCalled();
      expect(instance.renderContent.mock.calls).toMatchSnapshot();
    });

    it('should renderContent received - completedToMe', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({
        show: RECEIVED,
        showCompleted: true,
        completedToMe: ['completedToMe'],
      });

      expect(instance.render()).toBe('renderContent');

      expect(instance.renderContent).toBeCalled();
      expect(instance.renderContent.mock.calls).toMatchSnapshot();
    });

    it('should renderContent sent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ show: SENT, sent: ['sent'] });

      expect(instance.render()).toBe('renderContent');

      expect(instance.renderContent).toBeCalled();
      expect(instance.renderContent.mock.calls).toMatchSnapshot();
    });

    it('should renderContent sent - completedFromMe', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({
        show: SENT,
        showCompleted: true,
        completedFromMe: ['completedFromMe'],
      });

      expect(instance.render()).toBe('renderContent');

      expect(instance.renderContent).toBeCalled();
      expect(instance.renderContent.mock.calls).toMatchSnapshot();
    });

    it('should null otherwise', () => {
      rendered.setProps({ show: 'some thing very wrong' });

      expect(instance.render()).toBe(null);
    });
  });
});
