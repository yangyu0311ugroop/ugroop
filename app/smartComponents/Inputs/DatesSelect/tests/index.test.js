import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DatesSelect } from '../index';

describe('<DatesSelect />', () => {
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

  const moment = {
    format: jest.fn(() => 'format'),
    diff: jest.fn(),
    isBefore: () => true,
    isSame: () => true,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<DatesSelect {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DatesSelect).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openDialog()', () => {
    it('should openDialog()', () => {
      PORTAL_HELPERS.openDatesSelect = jest.fn();

      instance.openDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openDatesSelect);
    });
  });

  describe('handleDatesChange()', () => {
    it('should handleDatesChange()', () => {
      instance.handleDatesChange({ test: true });

      expect(rendered.state().test).toBe(true);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should handleValidSubmit()', () => {
      expect(instance.handleValidSubmit(123)).toBe(123);
    });
  });

  describe('renderPopperMenu()', () => {
    it('should renderPopperMenu', () => {
      TEST_HELPERS.expectDefined(instance.renderPopperMenu, [{}]);
    });
  });

  describe('renderDates()', () => {
    it('should renderDates() multiple and startDate is null', () => {
      rendered.setProps({ multiple: true });
      expect(instance.renderDates({ startDate: null })).toMatchSnapshot();
    });

    it('should renderDates() multiple and startDate is not null', () => {
      rendered.setProps({ multiple: true });
      expect(
        instance.renderDates({
          startDate: null,
          endDate: null,
          dates: [moment],
        }),
      ).toBeDefined();
    });

    it('should renderDates() range', () => {
      rendered.setProps({ range: true });

      expect(instance.renderDates()).toBeDefined();
    });

    it('should renderDates() 1 range', () => {
      rendered.setProps({ range: true });

      expect(instance.renderDates({ startDate: moment })).toBeDefined();
    });

    it('should renderDates() 2 range', () => {
      rendered.setProps({ range: true });

      expect(
        instance.renderDates({ startDate: moment, endDate: moment }),
      ).toBeDefined();
    });

    it('should renderDates() !range !startDate', () => {
      expect(instance.renderDates({ startDate: null })).toMatchSnapshot();
    });

    it('should renderDates() !range startDate', () => {
      expect(instance.renderDates({ startDate: moment })).toMatchSnapshot();
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      rendered.setProps({ smDown: true });
      instance.renderDates = jest.fn();

      TEST_HELPERS.expectDefined(instance.renderButton(), [{}]);
    });

    it('should renderButton !smDown', () => {
      rendered.setProps({ smDown: false });
      instance.renderDates = jest.fn();

      TEST_HELPERS.expectDefined(instance.renderButton(), [{}]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
