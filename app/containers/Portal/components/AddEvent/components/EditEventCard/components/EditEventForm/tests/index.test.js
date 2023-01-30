import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EditEventForm, defaultCancellationDate } from '../index';

describe('defaultCancellationDate()', () => {
  it('should defaultCancellationDate null', () => {
    EVENT_VIEW_HELPERS.cancellationCancellationDate = jest.fn(() => null);

    expect(defaultCancellationDate({})).toBe(undefined);
  });

  it('should return defaultCancellationDate', () => {
    EVENT_VIEW_HELPERS.cancellationCancellationDate = jest.fn(() => '1234');

    expect(defaultCancellationDate({})).toBeDefined();
  });
});

describe('<EditEventForm />', () => {
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

    rendered = shallow(<EditEventForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditEventForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      rendered.setState({ cancellationDate: undefined });

      instance.componentDidMount();

      expect(rendered.state().cancellationDate).toBeDefined();
    });
  });

  describe('renderCloseButton()', () => {
    it('should return null', () => {
      rendered.setProps({ onCloseDialog: null });

      expect(instance.renderCloseButton()).toBe(null);
    });

    it('should renderCloseButton', () => {
      rendered.setProps({ onCloseDialog: jest.fn });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCloseButton);
    });
  });

  describe('handlePickDate()', () => {
    it('should handlePickDate()', () => {
      instance.handlePickDate('2021');

      expect(rendered.state().cancellationDate).toBeDefined();
    });
  });

  describe('renderFormHeader()', () => {
    it('should render edit', () => {
      rendered.setProps({ subform: 'FlightBookingForm' });
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormHeader);
    });

    it('should render CancellationForm', () => {
      rendered.setProps({ subform: 'CancellationForm' });
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormHeader);
    });

    it('should renderFormHeader', () => {
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFormHeader);
    });
  });

  describe('formComponent()', () => {
    it('should return null', () => {
      expect(instance.formComponent()).toBe(null);
    });

    it('should return Flight', () => {
      expect(instance.formComponent('', 'Flight')).not.toBe(null);
    });

    it('should return Transportation', () => {
      expect(instance.formComponent('Transportation')).not.toBe(null);
    });

    it('should return Activity', () => {
      expect(instance.formComponent('Activity')).not.toBe(null);
    });

    it('should return Accommodation', () => {
      expect(instance.formComponent('Accommodation')).not.toBe(null);
    });
  });

  describe('renderForm()', () => {
    it('should return null', () => {
      instance.formComponent = jest.fn(() => null);

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });

    it('should renderForm FlightBookingForm', () => {
      rendered.setProps({ subform: 'ReservationForm' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });

    it('should renderForm FlightBookingForm', () => {
      rendered.setProps({ subform: 'FlightBookingForm' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });

    it('should renderForm AttachmentForm', () => {
      rendered.setProps({ subform: 'AttachmentForm' });

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

  describe('openEditDialog()', () => {
    it('should openEditDialog() FlightBookingForm', () => {
      rendered.setProps({ subform: 'FlightBookingForm' });

      instance.openEditDialog();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should openEditDialog()', () => {
      instance.openEditDialog();

      TEST_HELPERS.expectCalled(resaga.setValue);
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

  describe('typeSubtype()', () => {
    it('should return changingType', () => {
      rendered.setState({ newType: 'newtype', newSubtype: 'newSubtype' });

      expect(instance.typeSubtype().changingType).toBe(true);
    });

    it('should return default', () => {
      rendered.setState({
        type: 'currentType',
        subtype: 'current sub',
        newType: '',
        newSubtype: '',
      });

      expect(instance.typeSubtype().type).toBe('currentType');
    });
  });

  describe('openChangeType()', () => {
    it('should openChangeType', () => {
      instance.openChangeType();

      expect(rendered.state().changingType).toBe(true);
    });
  });

  describe('cancelChangeType()', () => {
    it('should cancelChangeType', () => {
      instance.cancelChangeType();

      expect(rendered.state().changingType).toBe(false);
    });
  });

  describe('changeNewTypeSubType()', () => {
    it('should changeNewTypeSubType', () => {
      instance.changeNewTypeSubType();

      expect(rendered.state().changingType).toBe(false);
    });
  });

  describe('handleSelectType()', () => {
    it('should handleSelectType', () => {
      instance.handleSelectType({ type: 'newType' })();

      expect(rendered.state().newType).toBe('newType');
    });
  });

  describe('handleClickSubtype()', () => {
    it('should handleClickSubtype', () => {
      instance.changeNewTypeSubType = jest.fn();
      instance.handleClickSubtype({ subtype: 'subtype' })();

      expect(rendered.state().newSubtype).toBe('subtype');
      TEST_HELPERS.expectCalled(instance.changeNewTypeSubType);
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

  describe('renderSelectTypeSubtype()', () => {
    it('should renderSelectTypeSubtype', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectTypeSubtype);
    });
  });

  describe('render()', () => {
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

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
