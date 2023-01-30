import {
  CANCELED,
  CONFIRMED,
  DECLINED,
  PENDING,
  RECEIVED,
} from 'datastore/invitationStore/constants';
import {
  DO_NOTHING,
  ORGANISATION,
  PERSONAL,
  TOUR_INVITATION_TYPE,
} from 'appConstants';
import { CONFIRM_INVITATION, DECLINE_INVITATION } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Received } from '../index';

describe('<Received />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };
  const props = {
    token: 'thisToken',
    classes: {},
    resaga,
    intl,
    orgUserIds: [1],
  };

  beforeEach(() => {
    rendered = shallow(<Received {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Received).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('response()', () => {
    it('should call dispatchTo', () => {
      rendered.setProps({ role: 'someRole', nodeId: 999 });

      instance.response(RECEIVED, 'that token')();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
    it('action transfer confirm', () => {
      rendered.setProps({
        role: 'someRole',
        nodeId: 999,
        type: TOUR_INVITATION_TYPE.TRANSFER,
      });
      instance.onTransferAccept = jest.fn();
      instance.response(CONFIRM_INVITATION, 'that token')();

      TEST_HELPERS.expectCalled(instance.onTransferAccept);
    });
    it('action transfer decline', () => {
      rendered.setProps({
        role: 'someRole',
        nodeId: 999,
        type: TOUR_INVITATION_TYPE.TRANSFER,
      });

      instance.response(DECLINE_INVITATION, 'that token')();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
    it('do nothing', () => {
      rendered.setProps({
        type: TOUR_INVITATION_TYPE.TRANSFER,
      });
      expect(instance.response('hello', 'that token')()).toEqual(DO_NOTHING);
    });
  });

  describe('excludeToken()', () => {
    it('should excludeToken()', () => {
      instance.excludeToken(1, { token: '2233' });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('renderConfirmedButtons()', () => {
    it('should renderConfirmedButtons', () => {
      const snapshot = shallow(<div>{instance.renderConfirmedButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRedButtons()', () => {
    it('should renderRedButtons', () => {
      const snapshot = shallow(
        <div>{instance.renderRedButtons('Some label')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPendingButtons()', () => {
    it('should renderPendingButtons', () => {
      const snapshot = shallow(<div>{instance.renderPendingButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderPendingButtons', () => {
      rendered.setState({ accepting: true });
      const snapshot = shallow(<div>{instance.renderPendingButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButtons()', () => {
    it('should renderConfirmedButtons', () => {
      rendered.setProps({ status: CONFIRMED });
      instance.renderConfirmedButtons = jest.fn(() => 'renderConfirmedButtons');

      expect(instance.renderButtons()).toBe('renderConfirmedButtons');
    });

    it('should renderDeclinedButtons', () => {
      rendered.setProps({ status: DECLINED });
      instance.renderRedButtons = jest.fn(() => 'renderRedButtons');

      expect(instance.renderButtons()).toBe('renderRedButtons');

      expect(instance.renderRedButtons).toBeCalledWith('Invitation declined');
    });

    it('should renderCanceledButtons', () => {
      rendered.setProps({ status: CANCELED });
      instance.renderRedButtons = jest.fn(() => 'renderRedButtons');

      expect(instance.renderButtons()).toBe('renderRedButtons');

      expect(instance.renderRedButtons).toBeCalledWith('Invitation cancelled');
    });

    it('should renderPendingButtons', () => {
      rendered.setProps({ status: PENDING });
      instance.renderPendingButtons = jest.fn(() => 'renderPendingButtons');

      expect(instance.renderButtons(true)).toBe('renderPendingButtons');
    });

    it('should return null', () => {
      rendered.setProps({ status: 'some other status' });

      expect(instance.renderButtons()).toBe(null);
    });
  });

  describe('renderPersonalMessage()', () => {
    it('should render when no message', () => {
      rendered.setProps({ personalMessage: '' });

      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render when has message', () => {
      rendered.setProps({ personalMessage: 'please join us' });

      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderOrg()', () => {
    it('Should return nothing if orgId is null', () => {
      const snapshot = shallow(<div>{instance.renderOrg()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render organisation component if no organisation name is blank', () => {
      rendered.setProps({ orgId: 1 });
      const snapshot = shallow(<div>{instance.renderOrg()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render organisation organisation name', () => {
      rendered.setProps({ orgId: 1, organisationName: 'My Org' });
      const snapshot = shallow(<div>{instance.renderOrg()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onSuccessAccepTransfer()', () => {
    it('should render correctly on template view', () => {
      rendered.setProps({ view: 'template' });
      const snapshot = shallow(<div>{instance.onSuccessAccepTransfer()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly on invitation view', () => {
      const snapshot = shallow(<div>{instance.onSuccessAccepTransfer()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('onFailureAccepTransfer()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.onFailureAccepTransfer()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('cancelOptionTransfer()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.cancelOptionTransfer()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('onTransferAccept()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.onTransferAccept()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onConfirmTransferAccept()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.onConfirmTransferAccept()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ transferOrgId: 1 });
      const snapshot = shallow(<div>{instance.onConfirmTransferAccept()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrgButton() for organisation', () => {
    it('should render correctly', () => {
      rendered.setState({ selectedOrgId: { orgType: ORGANISATION, id: 1 } });
      const snapshot = shallow(
        <div>{instance.renderOrgButton({ openMenu: () => 'test' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly for personal', () => {
      rendered.setState({ selectedOrgId: { orgType: PERSONAL, id: 1 } });
      const snapshot = shallow(
        <div>{instance.renderOrgButton({ openMenu: () => 'test' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onClickOrgMenu()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>
          {instance.onClickOrgMenu({})({ stopPropagation: () => 'helloe' })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderOrgMenu()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderOrgMenu({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderOrgMenuItem()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderOrgMenuItem({ closeMenu: 'test' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
