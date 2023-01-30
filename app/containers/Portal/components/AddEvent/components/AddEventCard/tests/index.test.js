import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddEventCard, convertAttachments } from '../index';

jest.useFakeTimers();

describe('convertAttachments()', () => {
  it('should return data', () => {
    expect(
      convertAttachments({
        eventAttachments: [{ id: 1 }, { id: 2, errorMessage: 'some error' }],
      }),
    ).toEqual({
      eventAttachments: [{ id: 1 }],
    });
  });

  it('should return data #2', () => {
    expect(convertAttachments({ name: '123' })).toEqual({
      name: '123',
    });
  });

  it('should convertAttachments', () => {
    expect(
      convertAttachments({
        eventAttachments: { 0: { name: 1 }, 1: { name: 2 } },
      }),
    ).toEqual({
      eventAttachments: [{ name: 1 }, { name: 2 }],
    });
  });
});

describe('<AddEventCard />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<AddEventCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddEventCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleAddNextEvent()', () => {
    it('should return adding true', () => {
      rendered.setState({ addCount: 0 });

      instance.handleAddNextEvent();

      expect(rendered.state().adding).toBe(true);
    });

    it('should updateTimes', () => {
      instance.updateTimes = jest.fn();
      rendered.setState({ addCount: 1, checkedEvents: [1] });

      instance.handleAddNextEvent();

      TEST_HELPERS.expectCalled(instance.updateTimes);
    });

    it('should addEventToDay', () => {
      instance.addEventToDay = jest.fn();
      rendered.setState({ addCount: 1, checkedEvents: [1, 2] });

      instance.handleAddNextEvent();

      TEST_HELPERS.expectCalled(instance.addEventToDay);
    });
  });

  describe('updateTimesSuccess()', () => {
    it('should updateTimesSuccess()', () => {
      instance.updateTimesSuccess();

      expect(rendered.state().adding).toBe(false);
    });
  });

  describe('updateTimes()', () => {
    it('should updateTimes()', () => {
      NODE_API_HELPERS.getTimes = jest.fn(() => '');

      instance.updateTimes();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.getTimes);
    });
  });

  describe('addEventToDay()', () => {
    it('should addEventToDay()', () => {
      TEMPLATE_API_HELPERS.moveToDay = jest.fn(() => '');

      instance.addEventToDay();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.moveToDay);
    });
  });

  describe('handlePatchEventSuccess()', () => {
    it('should handlePatchEventSuccess()', () => {
      instance.handleAddNextEvent = jest.fn();
      rendered.setState({ addCount: 2 });

      instance.handlePatchEventSuccess();

      expect(rendered.state().addCount).toBe(3);
      TEST_HELPERS.expectCalled(instance.handleAddNextEvent);
    });
  });

  describe('handleAddNextEvent()', () => {
    it('should set adding', () => {
      rendered.setState({ addCount: 0 });

      instance.handleAddNextEvent();

      expect(rendered.state().adding).toBe(true);
    });

    it('should call updateTimes', () => {
      instance.updateTimes = jest.fn();

      rendered.setState({ addCount: 2, checkedEvents: [1, 2] });

      instance.handleAddNextEvent();

      TEST_HELPERS.expectCalled(instance.updateTimes);
    });

    it('should call addEventToDay', () => {
      instance.addEventToDay = jest.fn();

      rendered.setState({
        addCount: 1,
        checkedEvents: [{ id: 1 }, { id: 2 }],
        data: [{ id: 1 }, { id: 2 }],
      });

      instance.handleAddNextEvent();

      TEST_HELPERS.expectCalled(instance.addEventToDay);
    });
  });

  describe('updateTimesSuccess()', () => {
    it('should updateTimesSuccess()', () => {
      rendered.setState({
        addCount: 1,
        checkedEvents: [{ id: 1 }, { id: 2 }],
        data: [{ id: 1 }, { id: 2 }],
      });
      instance.updateTimesSuccess();

      expect(rendered.state().addCount).toBe(0);
      expect(rendered.state().checkedEvents).toEqual([]);
      expect(rendered.state().data).toEqual([]);
      expect(rendered.state().adding).toBe(false);
    });
  });

  describe('updateTimes()', () => {
    it('should updateTimes()', () => {
      NODE_API_HELPERS.getTimes = jest.fn(() => '');

      instance.updateTimes();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.getTimes);
    });
  });

  describe('addEventToDay()', () => {
    it('should addEventToDay()', () => {
      TEMPLATE_API_HELPERS.moveToDay = jest.fn(() => '');

      instance.addEventToDay();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.moveToDay);
    });
  });

  describe('handlePatchEventSuccess()', () => {
    it('should handlePatchEventSuccess()', () => {
      rendered.setState({ addCount: 0 });

      instance.handlePatchEventSuccess();

      expect(rendered.state().addCount).toBe(1);
    });
  });

  describe('createEvent()', () => {
    it('should createEvent()', () => {
      TEMPLATE_API_HELPERS.createEvent = jest.fn();

      instance.createEvent({})();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.createEvent);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should return null if creating', () => {
      rendered.setState({ creating: true });

      expect(instance.handleValidSubmit()).toBe(null);
    });

    it('should handleValidSubmit', () => {
      rendered.setState({ creating: false });
      instance.createEvent = jest.fn();

      instance.handleValidSubmit();

      expect(rendered.state().creating).toBe(true);
    });
  });

  describe('handleCreateEventSuccess()', () => {
    it('should handleCreateEventSuccess()', () => {
      instance.handleCloseDialog = jest.fn();
      PORTAL_HELPERS.openViewEvent = jest.fn();

      instance.handleCreateEventSuccess({ node: { 1: { parentNodeId: 22 } } });

      TEST_HELPERS.expectCalledAndMatchSnapshot(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('formChangeDebounce()', () => {
    it('should call once', () => {
      instance.formChange = jest.fn();

      instance.formChangeDebounce({ placeId: 1 });
      instance.formChangeDebounce({ placeId: 1 });

      // Fast-forward until all timers have been executed
      jest.runAllTimers();

      expect(instance.formChange).toBeCalledTimes(1);
    });
  });

  describe('formChange()', () => {
    it('should formChange()', () => {
      instance.formChange({ 'data.name': 'aabbcc' });

      expect(rendered.state().formValue).toEqual({ data: { name: 'aabbcc' } });
    });
  });

  describe('handleValid()', () => {
    it('should handleValid()', () => {
      instance.handleValid(true)();

      expect(rendered.state().isValid).toBe(true);
    });
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('renderLeft()', () => {
    it('should renderLeft smDown', () => {
      rendered.setProps({ smDown: true });
      instance.renderForm = jest.fn(() => 'renderForm');

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });

    it('should renderLeft', () => {
      rendered.setProps({ smDown: false });
      instance.renderForm = jest.fn(() => 'renderForm');

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderEvent()', () => {
    it('should renderEvent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });
  });

  describe('handleClickUnscheduledEvent()', () => {
    it('should handleClickUnscheduledEvent() concat', () => {
      rendered.setState({ checkedEvents: [], data: [] });

      instance.handleClickUnscheduledEvent({ id: 123 })({});

      expect(rendered.state().checkedEvents.indexOf(123)).toBe(0);
    });

    it('should handleClickUnscheduledEvent() delete', () => {
      rendered.setState({ checkedEvents: [123], data: [{ id: 123 }] });

      instance.handleClickUnscheduledEvent({ id: 123 })({});

      expect(rendered.state().checkedEvents.indexOf(123)).toBe(-1);
    });
  });

  describe('renderUnscheduledEvent()', () => {
    it('should renderUnscheduledEvent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUnscheduledEvent, [
        { id: 123 },
      ]);
    });
  });

  describe('renderSelectUnscheduledEvents()', () => {
    it('should renderSelectUnscheduledEvents', () => {
      instance.renderUnscheduledEvent = jest.fn(() => 'renderUnscheduledEvent');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSelectUnscheduledEvents(1),
        [[1, 2]],
      );
    });
  });

  describe('renderSelect()', () => {
    it('should renderSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent smDown', () => {
      rendered.setProps({ smDown: true });
      instance.renderLeft = jest.fn(() => 'renderLeft');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should renderContent', () => {
      rendered.setProps({ smDown: false });
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderEvent = jest.fn(() => 'renderEvent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should renderSelect', () => {
      rendered.setProps({ selectUnscheduled: true });
      rendered.setState({ creating: false });
      instance.renderSelect = jest.fn(() => 'renderSelect');

      expect(instance.render()).toBe('renderSelect');
    });

    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
