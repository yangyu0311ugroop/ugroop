import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { defaultValue, EndDate } from '../index';

describe('<EndDate />', () => {
  describe('defaultValue()', () => {
    it('should return endTimeValue', () => {
      EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => 'P1D');

      expect(defaultValue({})).toBe('P1D');
    });

    it('should return tempEndDay', () => {
      EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => '');
      EVENT_VIEW_HELPERS.tempEndDay = jest.fn(() => 'tempEndDay');

      expect(defaultValue({})).toBe('tempEndDay');
    });
  });

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

    rendered = shallow(<EndDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EndDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderUnanchoredDays()', () => {
    it('should Same', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 0);

      expect(instance.renderUnanchoredDays()).toBe('Same day');
    });

    it('should renderUnanchoredDays', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 1);

      expect(instance.renderUnanchoredDays()).not.toBe('Same day');
    });
  });

  describe('renderDayDate()', () => {
    it('should renderDayDate', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDayDate({}));
    });
  });

  describe('renderButton()', () => {
    it('should return batchCreate', () => {
      instance.renderUnanchoredDays = jest.fn(() => 'renderUnanchoredDays');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [
        { batchCreate: true },
      ]);
    });

    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [
        { startDayId: 1 },
      ]);
    });
  });

  describe('options()', () => {
    it('should return slice', () => {
      rendered.setProps({ dayIds: [1, 2, 3] });

      expect(instance.options(2)).toEqual([2, 3]);
    });

    it('should options', () => {
      rendered.setProps({ dayIds: [1, 2, 3] });

      expect(instance.options(11)).toEqual([1, 2, 3]);
    });
  });

  describe('clickOption()', () => {
    it('should clickOption()', () => {
      instance.clickOption({ index: 3 })();

      expect(rendered.state().value).toBe('P3D');
    });
  });

  describe('renderOptionContent()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOptionContent, [
        { showDate: false },
      ]);
    });

    it('should renderOptionContent index 0', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOptionContent, [
        { showDate: true, index: 0 },
      ]);
    });

    it('should renderOptionContent index !0', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOptionContent, [
        { showDate: true, index: 10 },
      ]);
    });
  });

  describe('renderOption()', () => {
    it('should renderOption', () => {
      instance.renderOptionContent = jest.fn(() => 'renderOptionContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOption({}));
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      instance.renderOption = jest.fn(() => () => 'renderOption');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [{}]);
    });
  });

  describe('startDayId()', () => {
    it('should return first dayIds', () => {
      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => null);
      EVENT_VIEW_HELPERS.parentNodeId = jest.fn(() => null);
      rendered.setProps({ dayIds: [122, 2] });

      expect(instance.startDayId()).toBe(122);
    });

    it('should startDayId', () => {
      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => null);
      EVENT_VIEW_HELPERS.parentNodeId = jest.fn(() => '123');
      rendered.setProps({ dayIds: [1, 2] });

      expect(instance.startDayId()).toBe(123);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderButton = jest.fn(() => 'renderButton');
      instance.renderMenu = jest.fn(() => 'renderMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
