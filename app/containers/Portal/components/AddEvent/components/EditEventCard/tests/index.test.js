import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EditEventCard } from '../index';

jest.useFakeTimers();

describe('<EditEventCard />', () => {
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

    rendered = shallow(<EditEventCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditEventCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('patchEvent()', () => {
    it('should patchEvent() FlightBookingForm', () => {
      TEMPLATE_API_HELPERS.patchFlightBooking = jest.fn();
      rendered.setProps({ subform: 'FlightBookingForm' });

      instance.patchEvent({})();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.patchFlightBooking);
    });

    it('should patchEvent()', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();

      instance.patchEvent({})();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.patchEvent);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should close if !isChanged', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });
      rendered.setState({ isChanged: false });

      instance.handleValidSubmit();

      TEST_HELPERS.expectCalled(onClose);
    });

    it('should return null if creating', () => {
      rendered.setState({ creating: true, isChanged: true });

      expect(instance.handleValidSubmit()).toBe(null);
    });

    it('should handleValidSubmit', () => {
      rendered.setState({ creating: false, isChanged: true });
      instance.patchEvent = jest.fn();

      instance.handleValidSubmit();

      expect(rendered.state().creating).toBe(true);
    });
  });

  describe('changeFormValue()', () => {
    it('should changeFormValue()', () => {
      instance.changeFormValue({ data: 'formValue' });

      expect(rendered.state().formValue).toEqual({ data: 'formValue' });
    });
  });

  describe('handlePatchEventSuccess()', () => {
    it('should handlePatchEventSuccess()', () => {
      instance.updateTimes = jest.fn();
      PORTAL_HELPERS.openViewEvent = jest.fn();

      instance.handlePatchEventSuccess();

      TEST_HELPERS.expectCalled(instance.updateTimes);
    });
  });

  describe('updateTimes()', () => {
    it('should updateTimes()', () => {
      NODE_API_HELPERS.getTimes = jest.fn();

      instance.updateTimes();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.getTimes);
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

  describe('makeFormValue()', () => {
    it('should work when changing type', () => {
      rendered.setState({
        formValue: {
          data: {
            type: 'type',
            detail: {
              type: 'subtype',
            },
          },
          temp: {
            changingType: true,
          },
        },
      });

      expect(instance.makeFormValue()).toBeDefined();
    });

    it('should makeFormValue', () => {
      rendered.setState({
        formValue: {
          data: {
            type: 'type',
            detail: {
              type: 'subtype',
            },
          },
          temp: {
            changingType: true,
          },
        },
      });

      expect(instance.makeFormValue()).toBeDefined();
    });
  });

  describe('makeSubFormValue()', () => {
    it('should makeSubFormValue subform AttachmentForm', () => {
      rendered.setProps({ subform: 'AttachmentForm' });

      expect(instance.makeSubFormValue()).toBeDefined();
    });

    it('should makeSubFormValue subform ReservationForm', () => {
      rendered.setProps({ subform: 'ReservationForm' });

      expect(instance.makeSubFormValue()).toBeDefined();
    });

    it('should makeSubFormValue subform CancellationForm', () => {
      rendered.setProps({ subform: 'CancellationForm' });

      expect(instance.makeSubFormValue()).toBeDefined();
    });

    it('should makeSubFormValue normal', () => {
      rendered.setProps({ subform: '' });

      expect(instance.makeSubFormValue()).toBeDefined();
    });
  });

  describe('renderEvent()', () => {
    it('should renderEvent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
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
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
