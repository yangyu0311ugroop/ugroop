import { DO_NOTHING } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import moment from 'moment';
import { AddTour } from '../index';

describe('<AddTour />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(() => 'dispatchTo'),
  };
  const history = {
    push: jest.fn(() => 'history.push'),
  };

  const props = {
    classes: {},
    resaga,
    history,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<AddTour {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddTour).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount', () => {
      instance.organisationId = jest.fn(() => 2233);

      instance.componentDidMount();

      expect(rendered.state().selectedOrganisationId).toBe(2233);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps', () => {
      instance.organisationId = jest.fn(next => (next ? 122 : 233));

      instance.componentWillReceiveProps({});

      expect(rendered.state().selectedOrganisationId).toBe(122);
    });
  });

  describe('onCreateSuccess()', () => {
    it('should onCreateSuccess()', () => {
      instance.handleCloseDialog = jest.fn(() => 'handleCloseDialog');

      instance.onCreateSuccess({ node: { id: 2233 } });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleCloseDialog);
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });
  });

  describe('onCreateError()', () => {
    it('should return null', () => {
      instance.handleCloseDialog = jest.fn(() => 'handleCloseDialog');
      expect(
        instance.onCreateError({
          status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
        }),
      ).toBe('handleCloseDialog');
    });

    it('should onCreateError', () => {
      expect(instance.onCreateError({ status: 'something wrong' })).toBe(
        DO_NOTHING,
      );
    });
  });

  describe('parentNodeId()', () => {
    it('should return rootNodeId state', () => {
      rendered.setProps({ organisationId: 123 });
      rendered.setState({ selectedOrganisationId: 234 });

      expect(instance.parentNodeId(345)).toBe(345);
    });

    it('should return rootNodeId prop', () => {
      rendered.setProps({ organisationId: 123 });
      rendered.setState({ selectedOrganisationId: 0 });

      expect(instance.parentNodeId(345)).toBe(345);
    });

    it('should return myRootNodeId', () => {
      rendered.setProps({ folderId: 2222 });

      expect(instance.parentNodeId(345)).toBe(2222);
    });
    it('should return folderId', () => {
      rendered.setProps({ myRootNodeId: 2222, organisationId: 0 });
      rendered.setState({ selectedOrganisationId: 0 });

      expect(instance.parentNodeId(345)).toBe(2222);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should call push', () => {
      instance.parentNodeId = jest.fn(() => 0);

      expect(instance.handleValidSubmit({})).toBe('history.push');
    });

    it('should call dispatchTo', () => {
      instance.parentNodeId = jest.fn(() => 5);
      rendered.setState({ selectedDay: 'some day' });

      expect(instance.handleValidSubmit({})).toBe('dispatchTo');
    });
    it('should call dispatchTo and date is valid', () => {
      instance.parentNodeId = jest.fn(() => 5);
      rendered.setState({ selectedDate: 'some date' });

      expect(instance.handleValidSubmit({})).toBe('dispatchTo');
    });
  });

  describe('handleCloseDialog()', () => {
    it('should handleCloseDialog()', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('onDateChange', () => {
    it('updates date without time + timezone', () => {
      instance.onDateChange(
        moment.utc('0001-02-03 21:12:21.121').utcOffset(-10 * 60),
      );
      expect(instance.state.selectedDate).toEqual('0001-02-03T00:00:00Z');
    });
    it('updates date to null', () => {
      instance.onDateChange(null);
      expect(instance.state.selectedDate).toEqual(null);
    });
  });

  describe('handlePickWeekDay()', () => {
    it('should handlePickWeekDay()', () => {
      instance.changeStartDate = jest.fn();

      instance.handlePickWeekDay(3)();

      expect(instance.state.selectedDay).toEqual(3);
    });
  });

  describe('onclickStep()', () => {
    it('should onclickStep()', () => {
      instance.changeStartDate = jest.fn();

      instance.onclickStep(3)();

      expect(instance.state.activeStep).toEqual(3);
    });
  });
  describe('startPickDate()', () => {
    it('should startPickDate()', () => {
      instance.picker = { open: jest.fn() };

      instance.startPickDate();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.picker.open);
    });
  });
  describe('selectOrganisationId()', () => {
    it('should selectOrganisationId()', () => {
      instance.selectOrganisationId(123)();

      expect(rendered.state().selectedOrganisationId).toBe(123);
    });
  });

  describe('organisationId()', () => {
    it('should return organisationId', () => {
      rendered.setProps({ organisationId: 2233 });

      expect(instance.organisationId()).toBe(2233);
    });

    it('should return selectedOrgId', () => {
      rendered.setProps({
        organisationId: 0,
        minimise: true,
        selectedOrgId: 334,
      });

      expect(instance.organisationId()).toBe(334);
    });

    it('should return organisationIdFromURL', () => {
      rendered.setProps({
        organisationId: 0,
        minimise: false,
        organisationIdFromURL: 444,
      });

      expect(instance.organisationId()).toBe(444);
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('renderOwnerButton()', () => {
    it('should renderOwnerButton organisation', () => {
      rendered.setState({ selectedOrganisationId: 2233 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderOwnerButton, [{}]);
    });
    it('should renderOwnerButton personal', () => {
      rendered.setState({ selectedOrganisationId: undefined });
      instance.organisationId = jest.fn(() => -1);

      TEST_HELPERS.expectMatchSnapshot(instance.renderOwnerButton, [{}]);
    });
  });

  describe('renderOrganisation()', () => {
    it('should renderOrganisation personal', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisation({}), [-1]);
    });

    it('should renderOrganisation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisation({}), [123]);
    });
  });

  describe('renderList()', () => {
    it('should renderList', () => {
      instance.renderOrganisation = jest.fn(() => () => 'renderOrganisation');

      TEST_HELPERS.expectMatchSnapshot(instance.renderList(), [
        { organisations: [1, 2] },
      ]);
    });
  });
  describe('handlePickerRef()', () => {
    it('should handlePickerRef()', () => {
      instance.handlePickerRef(11223);

      expect(instance.picker).toBe(11223);
    });
  });
  describe('renderOrganisationList()', () => {
    it('should renderOrganisationList', () => {
      instance.renderList = jest.fn(() => 'renderList');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisationList, [{}]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
