/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { View } from '..';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';

describe('<EventView />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      paperRoot: 'paperRoot',
      headerActions: 'headerActions',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    canEditEvent: false,
    open: false,
    id: 1,
    onClose: jest.fn(),
    dataId: 3,
    templateId: 2,
    startDate: MOMENT_HELPERS.testInstance,
    dayIds: [21923, 21924, 21925, 21926],
  });

  Date.now = jest.fn(() => 'now');

  beforeEach(() => {
    wrapper = shallow(<View {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(View).toBeDefined();
  });

  describe('#getPaperProps()', () => {
    it('returns PaperProps', () => {
      const PaperProps = 'PaperProps';
      instance.PaperProps = PaperProps;
      expect(instance.getPaperProps()).toEqual(PaperProps);
    });
  });

  describe('#handleDeleteEventSuccess()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteEventSuccess();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });

    it('calls props.onClose', () => {
      instance.handleDeleteEventSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleDeleteEventError()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteEventError();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteConfirm()', () => {
    it('calls TEMPLATE_API_HELPERS.deleteEvent', () => {
      TEMPLATE_API_HELPERS.deleteEvent = jest.fn();
      instance.handleDeleteConfirm();
      expect(TEMPLATE_API_HELPERS.deleteEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleDuplicateConfirm()', () => {
    it('calls renderDayIndex', () => {
      instance.state.dates = [];
      expect(instance.handleDuplicateConfirm()).toBe(null);
    });
    it('calls renderDayIndex', () => {
      instance.state.dates = [
        '2020-05-21',
        '2020-05-22',
        '2020-05-23',
        '2020-05-21',
      ];
      TEMPLATE_API_HELPERS.createEvent = jest.fn(() => 'createEvent');
      expect(instance.handleDuplicateConfirm()).toBe('createEvent');
      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.createEvent);
    });
  });

  describe('#handleDeleteCancel()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteCancel();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteClick()', () => {
    it('sets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteClick({ preventDefault: jest.fn() });
      expect(instance.setState).toBeCalledWith({ confirmingDelete: true });
    });
  });

  describe('#handleEditClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleEditClick();
    });
  });

  describe('#handleCloseClick()', () => {
    it('calls props.onClose', () => {
      instance.handleCloseClick();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('filterOptions', () => {
    it('should return true if type is not flight', () => {
      expect(
        instance.filterOptions({
          value: EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
        }),
      ).toBe(true);
    });
  });

  describe('#renderActions()', () => {
    it('still matches snapshot if props.canEditEvent', () => {
      wrapper.setProps({ canEditEvent: true, supplierPhone: '123' });
      instance.renderOtherActionButtons = jest.fn(
        () => 'renderOtherActionButtons',
      );
      instance.renderVerticalLine = jest.fn(() => 'renderVerticalLine');
      instance.renderDeleteButton = jest.fn(() => 'renderDeleteButton');
      instance.renderEditButton = jest.fn(() => 'renderEditButton');
      expect(instance.renderActions()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('handleSaveDuplication', () => {
    it('should render handleSaveDuplication if dates array is empty', () => {
      instance.state.dates = [];
      instance.setState = jest.fn();
      instance.handleSaveDuplication();
      expect(instance.setState).toBeCalledWith({ datesError: 'Select a date' });
    });
    it('should render handleSaveDuplication if dates array is not empty', () => {
      instance.state.dates = ['2020-12-21'];
      instance.setState = jest.fn();
      instance.handleSaveDuplication();
      expect(instance.setState).toBeCalledWith({ confirmingDuplicate: true });
    });
  });

  describe('handleDatesChange', () => {
    it('should render handleDatesChange if dates array was a value', () => {
      instance.setState = jest.fn();
      instance.handleDatesChange({ dates: [] });
      expect(instance.setState).toBeCalledWith({
        dates: [],
        datesError: '',
      });
    });
  });

  describe('handleCancelDuplication', () => {
    it('should call handleCancelDuplication', () => {
      instance.closePopper = jest.fn();
      instance.handleCancelDuplication();
      expect(instance.closePopper).toBeCalled();
    });
  });

  describe('handlePopperClickAway', () => {
    it('should call handlePopperClickAway', () => {
      instance.state.clickAway = true;
      instance.closePopper = jest.fn();
      instance.handlePopperClickAway();
      expect(instance.closePopper).toHaveBeenCalled();
    });
  });

  describe('closePopper', () => {
    it('should setState', () => {
      global.setTimeout = jest.fn(cb => cb());
      instance.closePopper();
      expect(global.setTimeout).toBeCalled();
      expect(instance.state.anchorEl).toEqual(null);
    });
  });

  describe('renderDuplicate', () => {
    // it('should run onClose and portal helper for opening add food', () => {
    //   const type = EVENT_CONSTANTS.TYPES.ACTIVITIES.type;
    //   const subtype = EVENT_CONSTANTS.ACTIVITIES.FOOD.type;
    //   const onClose = jest.fn();
    //   PORTAL_HELPERS.openAddFood = jest.fn();
    //   wrapper.setProps({ type, subtype, onClose });
    //
    //   instance.renderDuplicate();
    //
    //   expect(onClose).toBeCalled();
    //   expect(PORTAL_HELPERS.openAddFood).toBeCalled();
    // });
    //
    // it('should run onClose and portal helper for opening add accommodation', () => {
    //   const type = EVENT_CONSTANTS.TYPES.ACCOMMODATIONS.type;
    //   const onClose = jest.fn();
    //   PORTAL_HELPERS.openAddAccommodation = jest.fn();
    //   wrapper.setProps({ type, onClose });
    //
    //   instance.renderDuplicate();
    //
    //   expect(onClose).toBeCalled();
    //   expect(PORTAL_HELPERS.openAddAccommodation).toBeCalled();
    // });

    it('should set state', () => {
      instance.renderDuplicate({ currentTarget: true });
      expect(instance.state.anchorEl).toBe(true);
    });
  });

  describe('handleDuplicateCancel', () => {
    it('should set state', () => {
      instance.setState = jest.fn();
      instance.handleDuplicateCancel();
      expect(instance.setState).toBeCalledWith({ confirmingDuplicate: false });
    });
  });

  describe('handleDuplicateEventError', () => {
    it('should set state', () => {
      instance.setState = jest.fn();
      instance.onClose = jest.fn();
      instance.handleDuplicateEventError();
      expect(instance.setState).toBeCalledWith({ confirmingDuplicate: false });
    });
  });

  describe('handleDuplicateEventSuccess', () => {
    it('should set state', () => {
      instance.setState = jest.fn();
      instance.closePopper();
      instance.handleDuplicateEventSuccess();
      expect(instance.setState).toBeCalledWith({ confirmingDuplicate: false });
    });
  });

  describe('renderDuplicateButton', () => {
    it('should render duplicate button if displayDate is startDate', () => {
      wrapper.setProps({
        displayDate: 'startDate',
      });
      const snapshot = shallow(<div>{instance.renderDuplicateButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeading', () => {
    it('should render Dial button if type is activity and there is a supplierPhone', () => {
      wrapper.setProps({
        type: 'Activity',
        supplierPhone: '123',
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      const rendered = shallow(<div>{instance.renderHeading}</div>);
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should pass readOnly when subType is a transportation type', () => {
      wrapper.setProps({
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      const rendered = shallow(<div>{instance.renderHeading}</div>);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render popper if type is tranportation', () => {
      wrapper.setProps({
        type: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      const rendered = shallow(<div>{instance.renderHeading}</div>);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render popper if type is tranportation', () => {
      wrapper.setProps({
        type: 'activity',
      });
      instance.renderPart = jest.fn(() => 'renderPart');
      const rendered = shallow(<div>{instance.renderHeading}</div>);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
