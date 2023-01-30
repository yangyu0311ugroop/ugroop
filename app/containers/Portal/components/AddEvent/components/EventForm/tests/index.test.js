import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EventForm } from '../index';

describe('<EventForm />', () => {
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

    rendered = shallow(<EventForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCloseButton()', () => {
    it('should return null', () => {
      rendered.setProps({ onClose: null });

      expect(instance.renderCloseButton()).toBe(null);
    });

    it('should renderCloseButton', () => {
      rendered.setProps({ onClose: jest.fn });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCloseButton);
    });
  });

  describe('renderFormHeader()', () => {
    it('should render edit', () => {
      rendered.setProps({ action: 'edit' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormHeader);
    });

    it('should renderFormHeader', () => {
      rendered.setProps({ action: 'view' });
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormHeader);
    });
  });

  describe('formComponent()', () => {
    it('should return null', () => {
      rendered.setState({ subtype: 'ABC' });

      expect(instance.formComponent()).toBe(null);
    });

    it('should return Flight', () => {
      rendered.setState({ subtype: 'Flight' });

      expect(instance.formComponent()).not.toBe(null);
    });

    it('should return Transportation', () => {
      rendered.setState({ type: 'Transportation' });

      expect(instance.formComponent()).not.toBe(null);
    });

    it('should return Activity', () => {
      rendered.setState({ type: 'Activity' });

      expect(instance.formComponent()).not.toBe(null);
    });

    it('should return Accommodation', () => {
      rendered.setState({ type: 'Accommodation' });

      expect(instance.formComponent()).not.toBe(null);
    });
  });

  describe('renderForm()', () => {
    it('should return null', () => {
      instance.formComponent = jest.fn(() => null);

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });

    it('should renderForm', () => {
      instance.formComponent = jest.fn(() => 'span');

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('renderFormData()', () => {
    it('should renderFormData', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFormData);
    });
  });

  describe('hasFileLoading()', () => {
    it('should return false', () => {
      rendered.setProps({ formValue: { data: { eventAttachments: [] } } });
      rendered.setState({ type: 'aa', subtype: null });
      const retValue = instance.hasFileLoading();
      expect(retValue).toEqual(false);
    });
    it('should false', () => {
      rendered.setProps({ formValue: { data: { eventAttachments: [] } } });
      rendered.setState({ type: 'aa', subtype: 'bb' });
      const retValue = instance.hasFileLoading();
      expect(retValue).toEqual(false);
    });
    it('should return true', () => {
      rendered.setProps({
        formValue: { data: { eventAttachments: [{ id: 1 }] } },
        fileUploading: true,
      });
      rendered.setState({ type: 'aa', subtype: 'bb' });
      const retValue = instance.hasFileLoading();
      expect(retValue).toEqual(true);
    });
  });

  describe('renderFormButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ action: 'edit' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormButtons);
    });

    it('should renderFormButtons', () => {
      rendered.setProps({ action: 'view' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormButtons);
    });
  });

  describe('handleClickSubtype()', () => {
    it('should handleClickSubtype()', () => {
      instance.handleClickSubtype({ subtype: 'Car' })();

      expect(rendered.state().subtype).toBe('Car');
    });
  });

  describe('renderSubtype()', () => {
    it('should renderSubtype', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtype, [{}]);
    });
  });

  describe('renderSelectSubTypes()', () => {
    it('should renderSelectSubTypes', () => {
      EVENT_CONSTANTS.subtypeNamesByType = jest.fn(() => [1]);
      instance.renderSubtype = jest.fn(() => 'renderSubtype');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectSubTypes);
    });
  });

  describe('renderSelectTypes()', () => {
    it('should renderSelectTypes', () => {
      instance.renderType = jest.fn(() => 'renderType');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectTypes);
    });
  });

  describe('handleSelectType()', () => {
    it('should set active', () => {
      rendered.setState({ type: 'Car' });

      instance.handleSelectType({ type: 'Car' })();

      expect(rendered.state().selectSubtype).toBe(true);
    });

    it('should handleSelectType', () => {
      rendered.setState({ type: 'Car' });

      instance.handleSelectType({ type: 'Bus' })();

      expect(rendered.state().type).toBe('Bus');
      expect(rendered.state().subtype).toBe('');
    });
  });

  describe('renderType()', () => {
    it('should renderType', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderType, [{}]);
    });
  });

  describe('renderData()', () => {
    it('should renderData', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });
  });

  describe('handleSelectSubtype()', () => {
    it('should handleSelectSubtype()', () => {
      instance.handleSelectSubtype();

      expect(rendered.state().selectSubtype).toBe(true);
    });
  });

  describe('renderShowSelectSubtype()', () => {
    it('should renderSelectSubTypes', () => {
      rendered.setProps({ type: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowSelectSubtype);
    });

    it('should renderShowSelectSubtype', () => {
      rendered.setProps({ type: 'Car', selectSubtype: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowSelectSubtype);
    });
  });

  describe('clearSubtype()', () => {
    it('should clearSubtype()', () => {
      rendered.setState({ subtype: 'Flight' });

      instance.clearSubtype();

      expect(rendered.state().subtype).toBe('');
    });
  });

  describe('renderFlightForm()', () => {
    it('should renderFlightForm', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightForm);
    });
  });

  describe('render()', () => {
    it('should render Flight', () => {
      instance.renderData = jest.fn(() => 'renderData');
      instance.renderFlightForm = jest.fn(() => 'renderFlightForm');
      rendered.setState({ subtype: 'Flight', type: 'Transportation' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render !type !subtype', () => {
      instance.renderData = jest.fn(() => 'renderData');
      instance.renderFormHeader = jest.fn(() => 'renderFormHeader');
      instance.renderSelectTypes = jest.fn(() => 'renderSelectTypes');
      instance.renderShowSelectSubtype = jest.fn(
        () => 'renderShowSelectSubtype',
      );
      instance.renderFormData = jest.fn(() => 'renderFormData');
      instance.renderForm = jest.fn(() => 'renderForm');
      instance.renderFormButtons = jest.fn(() => 'renderFormButtons');
      instance.hasFileLoading = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      rendered.setState({ type: 'Accommodation', subtype: 'Hotel' });

      instance.renderData = jest.fn(() => 'renderData');
      instance.renderFormHeader = jest.fn(() => 'renderFormHeader');
      instance.renderSelectTypes = jest.fn(() => 'renderSelectTypes');
      instance.renderShowSelectSubtype = jest.fn(
        () => 'renderShowSelectSubtype',
      );
      instance.renderFormData = jest.fn(() => 'renderFormData');
      instance.renderForm = jest.fn(() => 'renderForm');
      instance.renderFormButtons = jest.fn(() => 'renderFormButtons');
      instance.hasFileLoading = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
