/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { GET_ORGTYPES } from '../defines/config';
import { Organisation, persist } from '../index';
import Wrapper from '../wrapper';
import { ORGANISATION_API, ORG_SYNC } from '../../../../apis/constants';

describe('containers/FirstTimeSetup/Organisation', () => {
  const intl = { formatMessage: () => '' };
  const resagaMock = {
    analyse: jest.fn(),
    dispatchTo: jest.fn(),
    dispatch: jest.fn(),
  };
  let rendered;
  let mockHandleLoading;

  const orgLists = [
    {
      id: 803,
      name: 'dddddddd',
      nameKey: 'org-dddddddd-',
      typeId: 803,
      type: 'TourProvider',
    },
  ];

  const userOrgs = [
    {
      orgId: 803,
      role: 'owner',
      rootNodeId: 5850,
      activated: true,
    },
  ];

  const me = {
    email: 'q@qq.com',
    fullName: 'Sum Ting Wong',
    givenName: 'Sum Ting',
    surname: 'Wong',
    customData: {
      orgName: 'ugggroop',
      orgType: 'educInstitution',
    },
  };

  const fetchFirstPurchaseQuantityFn = jest.fn();
  beforeEach(() => {
    mockHandleLoading = jest.fn();
    rendered = shallow(
      <Organisation
        me={me}
        classes={{}}
        resaga={resagaMock}
        intl={intl}
        handleLoading={mockHandleLoading}
        userOrgs={userOrgs}
        orgList={orgLists}
        knownAs={me.fullName}
        email={me.email}
        fetchFirstPurchaseQuantity={fetchFirstPurchaseQuantityFn}
      />,
    );
  });
  afterEach(() => {
    resagaMock.analyse.mockClear();
    resagaMock.dispatch.mockClear();
  });

  describe('<Organisation />', () => {
    it('should exists', () => {
      expect(Organisation).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
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

  describe('componentWillReceiveProps()  ', () => {
    it('should call resaga.analyse', () => {
      const form = rendered.instance();
      form.componentWillReceiveProps({ hi: 'ho' });
      expect(resagaMock.analyse).toHaveBeenCalled();
    });
  });

  describe('componentDidMount()  ', () => {
    it('should be able to call getOrgTypesThenSetState() upon mounting', () => {
      const form = rendered.instance();
      form.getOrgTypesThenSetState = jest.fn();

      form.componentDidMount();
      expect(form.getOrgTypesThenSetState).toHaveBeenCalled();
    });
  });

  describe('getSaveButtonText() ', () => {
    it('should be called properly when creating', () => {
      const form = rendered.instance();
      form.text = s => s.id;

      const r = form.getSaveButtonText(true, false, false, false);
      expect(r).toBe(
        'app.containers.FirstTimeSetup.Organisation.settingUpOrganisation',
      );
    });
  });

  describe('getSaveButtonText() ', () => {
    it('should be called properly when syncing', () => {
      const form = rendered.instance();
      form.text = s => s.id;

      const r = form.getSaveButtonText(false, true, false, false);
      expect(r).toBe(
        'app.containers.FirstTimeSetup.Organisation.syncingWithServer',
      );
    });
  });

  describe('getSaveButtonText() ', () => {
    it('should be called properly when rolling', () => {
      const form = rendered.instance();
      form.text = s => s.id;

      const r = form.getSaveButtonText(false, false, true, false);
      expect(r).toBe(
        'app.containers.FirstTimeSetup.Organisation.rollingBackData',
      );
    });
  });

  describe('getSaveButtonText() ', () => {
    it('should be called properly when error', () => {
      const form = rendered.instance();
      form.text = s => s.id;

      const r = form.getSaveButtonText(false, false, false, true);
      expect(r).toBe('app.containers.FirstTimeSetup.Organisation.tryAgain');
    });
  });

  describe('getSaveButtonText() ', () => {
    it('should be called properly when in default state', () => {
      const form = rendered.instance();
      form.text = s => s.id;

      const r = form.getSaveButtonText(false, false, false, false);
      expect(r).toBe(
        'app.containers.FirstTimeSetup.Organisation.saveAndContinue',
      );
    });
  });

  describe('syncSuccess()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      persist.createPersistor = jest.fn();
      form.syncSuccess();
      expect(persist.createPersistor).toBeCalled();
      persist.createPersistor.mockClear();
    });
  });

  describe('syncFail()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.text = () => 'error';
      form.syncFail();
      expect(form.state.creating).toBe(false);
      expect(form.state.syncing).toBe(false);
      expect(form.state.error).toBe('error');
    });
  });

  describe('searchOrgType()  ', () => {
    it('should be called correctly', () => {
      const expected = { code: 'educ' };
      const orgTypes = [expected, { code: 'tour' }];
      const form = rendered.instance();
      const received = form.searchOrgType(expected.code, orgTypes);
      expect(received).toBe(expected);
    });
  });

  describe('getOrgTypesThenSetState()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.getOrgTypesThenSetState();
      expect(resagaMock.dispatch).toBeCalledWith('', GET_ORGTYPES);
    });
  });

  describe('orgTypesSuccess()  ', () => {
    it('should be called correctly', () => {
      const data = [{ key: 'value' }];
      const form = rendered.instance();
      form.orgTypesSuccess(data);
      expect(mockHandleLoading).toBeCalled();
      expect(rendered.state().syncing).toBe(false);
      expect(rendered.state().arrOrgTypes).toBe(data);
    });
  });

  describe('orgTypesFail()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.orgTypesFail();
      expect(mockHandleLoading).toBeCalled();
      expect(rendered.state().error).toBeDefined();
      expect(rendered.state().syncing).toBe(false);
    });
  });

  describe('generateCountrySelection()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      rendered.setState({ countryList: null });
      const div = form.generateCountrySelection();
      expect(div).toEqual(<div />);
    });
  });

  describe('handleSubmit()  ', () => {
    beforeEach(() => {
      resagaMock.dispatch.mockClear();
    });
    const formData = {
      country: 'AUS',
      orgtype: me.customData.orgType,
    };
    it('should be called correctly and not explode', async () => {
      const form = rendered.instance();
      const recieved = await form.handleSubmit()();
      expect(recieved).not.toBeDefined();
    });
    it('should be called correctly if there is NO support for org types', async () => {
      fetchFirstPurchaseQuantityFn.mockReturnValue(10);
      const form = rendered.instance();
      form.ref = {
        current: {
          collectPaymentInfo: () => ({
            planId: 'planId',
            stripeData: {
              token: {
                id: 'creditcard_token',
              },
            },
            bundlePlanId: 'planId2',
          }),
        },
      };
      const syncSuccess = jest.fn();
      const syncFail = jest.fn();
      form.syncSuccess = syncSuccess;
      form.syncFail = syncFail;
      form.setState({ hasOrgTypesFeature: false });
      await form.handleSubmit(userOrgs)(formData);
      expect(resagaMock.dispatchTo).toBeCalledWith(ORGANISATION_API, ORG_SYNC, {
        payload: {
          id: userOrgs[0].orgId,
          data: {
            country: formData.country,
            createdBy: undefined,
            type: formData.orgtype,
            subscription: {
              userId: undefined,
              name: me.fullName,
              planIds: ['planId', 'planId2'],
              source: 'creditcard_token',
              email: me.email,
              orgId: userOrgs[0].orgId,
              orgName: orgLists[0].name,
              quantity: 1,
            },
          },
        },
        onSuccess: syncSuccess,
        onError: syncFail,
      });
      expect(resagaMock.dispatchTo.mock.calls.length).toBe(1);
      resagaMock.dispatchTo.mockRestore();
    });
    it('should be called correctly if there is support for org types', () => {
      formData.country = null;
      const form = rendered.instance();
      form.setState({ hasOrgTypesFeature: true });
      form.handleSubmit(userOrgs)(formData);
      expect(resagaMock.dispatchTo).not.toBeCalled();
    });
  });

  describe('handleInvalid()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.handleInvalid();
      expect(rendered.state().invalidForm).toBe(true);
    });
  });

  describe('handleValid()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.handleValid();
      expect(rendered.state().invalid).toBe('');
      expect(rendered.state().invalidForm).toBe(false);
    });
  });
  describe('toggleHelp()  ', () => {
    it('should be called correctly', () => {
      const form = rendered.instance();
      form.toggleHelp('hello')();
      expect(rendered.state().showHelp).toEqual('hello');
    });
  });

  describe('onButtonClick', () => {
    it('should setState if invalidForm is true', () => {
      const form = rendered.instance();
      rendered.setState({
        invalidForm: true,
      });
      form.onButtonClick();
      expect(rendered.state().invalid).toBeDefined();
    });
    it('should not setState if invalidForm is true', () => {
      const form = rendered.instance();
      rendered.setState({
        invalidForm: false,
      });
      form.onButtonClick();
      expect(rendered.state().invalid).not.toBeDefined();
    });
  });
});
