import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { Organisation } from '../index';
import { TEST_HELPERS } from '../../../../../utils/helpers/testHelpers';

describe('<Organisation />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    userId: 1,
    organisationIdFromURL: 2233,
    match: {},
    history: {},
    location: { pathname: '/1/2/3' },
    xsDown: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = shallow(<Organisation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Organisation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call orgInfoSuccess', () => {
      instance.orgInfoSuccess = jest.fn(() => 'orgInfoSuccess');

      instance.componentDidMount();

      expect(instance.orgInfoSuccess).toBeCalled();
      expect(instance.orgInfoSuccess.mock.calls).toMatchSnapshot();
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call orgInfoSuccess', () => {
      instance.orgInfoSuccess = jest.fn(() => 'orgInfoSuccess');

      instance.componentWillReceiveProps({ organisationIdFromURL: 3344 });

      expect(instance.orgInfoSuccess).toBeCalled();
      expect(instance.orgInfoSuccess.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING', () => {
      instance.orgInfoSuccess = jest.fn(() => 'orgInfoSuccess');

      expect(
        instance.componentWillReceiveProps({ organisationIdFromURL: 2233 }),
      ).toBe(DO_NOTHING);

      expect(instance.orgInfoSuccess).not.toBeCalled();
    });
  });

  describe('getOrgSuccess()', () => {
    it('should call resaga.dispatchTo', () => {
      instance.getOrgSuccess(null, { id: 2233 });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ organisationIdFromURL: 0 });

      expect(instance.getOrgSuccess(null, {})).toBe(DO_NOTHING);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ xsDown: false });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return null', () => {
      rendered.setProps({ organisationIdFromURL: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should render loading if isLoading is true', () => {
      rendered.setProps({
        isLoading: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render unathorised if errorLoading is true', () => {
      rendered.setProps({
        isLoading: false,
      });
      rendered.setState({ errorLoading: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('orgInfoSuccess', () => {
    it('dispatchTo should be caled', () => {
      instance = rendered.instance();
      instance.orgInfoSuccess({ 0: { orgId: 1 } });
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('orgFetchOrgError', () => {
    it('errorLoading should be true', () => {
      instance = rendered.instance();
      instance.orgFetchOrgError({
        response: {
          error: { statusCode: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED },
        },
      });
      expect(rendered.state().errorLoading).toEqual(true);
      expect(rendered.state().errorStatusCode).toEqual(
        HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
      );
    });
    it('errorLoading should be true and errorStatusCode = STATUS_OK', () => {
      instance = rendered.instance();
      instance.orgFetchOrgError({
        response: { error: { statusCode: HTTP_STATUS_CODE.STATUS_OK } },
      });
      expect(rendered.state().errorLoading).toEqual(true);
      expect(rendered.state().errorStatusCode).toEqual(
        HTTP_STATUS_CODE.STATUS_OK,
      );
    });
  });

  describe('orgMembersSuccess', () => {
    it('dispatchTo should be called', () => {
      instance = rendered.instance();
      instance.orgMembersSuccess();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('renderRolesTab()', () => {
    it('should renderRolesTab', () => {
      TEST_HELPERS.expectDefined(instance.renderRolesTab);
    });
  });

  describe('renderSchoolTab()', () => {
    it('should renderSchoolTab', () => {
      TEST_HELPERS.expectDefined(instance.renderSchoolTab);
    });
  });

  describe('renderProfileTab()', () => {
    it('should renderProfileTab', () => {
      TEST_HELPERS.expectDefined(instance.renderProfileTab);
    });
  });

  describe('renderBillingTab()', () => {
    it('should renderBillingTab', () => {
      TEST_HELPERS.expectDefined(instance.renderBillingTab);
    });
  });

  describe('renderRedirect()', () => {
    it('should renderRedirect', () => {
      TEST_HELPERS.expectDefined(instance.renderRedirect);
    });
  });

  describe('renderSettingTab()', () => {
    it('should renderSettingTab', () => {
      TEST_HELPERS.expectDefined(instance.renderSettingTab);
    });
  });

  describe('renderPreferencesTab()', () => {
    it('should renderPreferencesTab', () => {
      TEST_HELPERS.expectDefined(instance.renderPreferencesTab);
    });
  });

  describe('orgTypesSuccess', () => {
    it('dispatchTo should be called', () => {
      instance = rendered.instance();
      instance.orgTypesSuccess();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
});
