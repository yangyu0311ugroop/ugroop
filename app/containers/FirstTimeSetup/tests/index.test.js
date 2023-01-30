/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { ADMIN, OWNER } from 'utils/orgRoleConstants';
import { FirstTimeSetup } from '../index';
import styleSheet from '../style';
import Wrapper, { Index } from '../wrapper';

describe('FirstTimeSetup', () => {
  let rendered;
  const me = { id: 7, customData: { orgSync: 'hi' } };
  const intl = { formatMessage: msgDescriptor => msgDescriptor.id };
  const orgList = [
    {
      createdBy: 9,
    },
  ];
  const resagaMock = {
    analyse: jest.fn(),
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(
      <FirstTimeSetup
        me={me}
        intl={intl}
        resaga={resagaMock}
        classes={styleSheet}
        handleLoading={() => {}}
        fetching={false}
        logout={() => {}}
        orgList={orgList}
      />,
    );
    jest.clearAllMocks();
  });

  describe('<FirstTimeSetup />', () => {
    it('should exists', () => {
      expect(FirstTimeSetup).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render if no orgSync', () => {
      rendered.setProps({ me: { customData: {} } });
      expect(rendered.length).toBe(1);
    });
    it('should render loading', () => {
      rendered.setProps({ fetching: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render person setup', () => {
      rendered.setProps({ orgs: [{ firstTimeSetup: true }] });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('Methods', () => {
    it('componentDidMount', () => {
      rendered.setProps({ me: {} });
      expect(resagaMock.dispatchTo).not.toBeCalled();
    });
    describe('getRoleMessage', () => {
      it('ADMIN VIEW', () => {
        rendered.instance().renderAdminMessage = jest.fn(
          () => 'renderAdminMessage',
        );
        const res = shallow(
          <div>{rendered.instance().getRoleMessage(ADMIN)}</div>,
        );
        expect(toJSON(res)).toMatchSnapshot();
      });
      it('should render message for owner', () => {
        rendered.instance().renderOwnerMessage = jest.fn(
          () => 'renderOwnerMessage',
        );
        const res = shallow(
          <div>{rendered.instance().getRoleMessage(OWNER)}</div>,
        );
        expect(toJSON(res)).toMatchSnapshot();
      });
      it('GENERAL VIEW', () => {
        rendered.instance().renderGeneralMessage = jest.fn(
          () => 'renderGeneralMessage',
        );
        const res = shallow(
          <div>{rendered.instance().getRoleMessage('test')}</div>,
        );
        expect(toJSON(res)).toMatchSnapshot();
      });
    });
    describe('renderNavigations', () => {
      it('should render data needed to go to next step if data that was get from the orgs was firstTimeSetup', () => {
        rendered.setProps({
          orgs: [{ firstTimeSetup: true }],
        });
        const res = shallow(
          <div>{rendered.instance().renderNavigations()}</div>,
        );
        expect(toJSON(res)).toMatchSnapshot();
      });

      it('should render data needed to go to next step if data that was get from the orgs was not firstTimeSetup', () => {
        rendered.setProps({
          orgs: [{ firstTimeSetup: false }],
        });
        const res = shallow(
          <div>{rendered.instance().renderNavigations()}</div>,
        );
        expect(toJSON(res)).toMatchSnapshot();
      });
    });
  });

  describe('Roles', () => {
    it('should render Administrator with no orgData yet', () => {
      rendered.instance().getRoleMessage = jest.fn(() => 'getRoleMessage');
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render Administrator with orgData already', () => {
      rendered.instance().getRoleMessage = jest.fn(() => 'getRoleMessage');
      rendered.setProps({ name: 'sample', role: 'admin' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render Member', () => {
      rendered.instance().getRoleMessage = jest.fn(() => 'getRoleMessage');
      rendered.setProps({ name: 'sample', role: 'general' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render Tour Creator', () => {
      rendered.instance().getRoleMessage = jest.fn(() => 'getRoleMessage');
      rendered.setProps({ name: 'sample', role: 'tour_creator' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render Reviewer', () => {
      rendered.instance().getRoleMessage = jest.fn(() => 'getRoleMessage');
      rendered.setProps({ name: 'sample', role: 'reviewer' });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render Personal message', () => {
      const snapshot = shallow(
        <div>{rendered.instance().renderPersonalAccountMessage()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render owner message', () => {
      const snapshot = shallow(
        <div>{rendered.instance().renderOwnerMessage()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render general message', () => {
      const snapshot = shallow(
        <div>{rendered.instance().renderGeneralMessage()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('Wrapper', () => {
    it('should exists', () => {
      expect(Wrapper).toBeDefined();
    });

    it('should render without exploding', () => {
      const render = shallow(<Wrapper />);
      expect(toJSON(render)).toMatchSnapshot();
    });
  });

  describe('Index Wrapper', () => {
    it('should exists', () => {
      expect(Index).toBeDefined();
    });

    it('should render without exploding', () => {
      const render = shallow(<Index />);
      expect(toJSON(render)).toMatchSnapshot();
    });
  });
});
