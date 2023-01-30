import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { Dietaries } from '../index';

describe('<Dietaries />', () => {
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
    rendered = shallow(<Dietaries {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Dietaries).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDietary()', () => {
    it('should renderDietary', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDietary, []);
    });
  });

  describe('renderDietaries()', () => {
    it('should return null', () => {
      rendered.setProps({ personDietaries: [] });

      expect(instance.renderDietaries()).toBe(false);
    });

    it('should renderDietaries', () => {
      rendered.setProps({ personDietaries: [1, 2] });
      instance.renderDietary = jest.fn(() => () => 'renderDietary');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDietaries);
    });
  });

  describe('Default Variant', () => {
    it("should match snapshot if value's length is greater than 0", () => {
      rendered.setProps({
        value: [1, 2],
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it("should match snapshot if value's length is less than 1", () => {
      rendered.setProps({
        value: [],
        readOnly: true,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.ICON', () => {
    it("should match snapshot if value's length is greater than 0", () => {
      rendered.setProps({
        value: [1, 2],
        variant: VARIANTS.ICON,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it("should match snapshot if value's length is less than 1", () => {
      rendered.setProps({
        value: [],
        variant: VARIANTS.ICON,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it("should match snapshot if value's length is less than 1 and noDietary is true", () => {
      rendered.setProps({
        value: [],
        variant: VARIANTS.ICON,
        noDietary: true,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.LOGIC', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        variant: VARIANTS.LOGIC,
        value: [1, 2],
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should match snapshot if value is empty array', () => {
      rendered.setProps({
        variant: VARIANTS.LOGIC,
        value: [],
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.COUNT', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        variant: VARIANTS.ROW,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.COUNT', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        variant: VARIANTS.COUNT,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.TEXT_ONLY', () => {
    it("should render text only if value's length prop is greater than 0", () => {
      rendered.setProps({
        value: [1, 2],
        variant: VARIANTS.TEXT_ONLY,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it("should render text only if value's length prop is less than 1", () => {
      rendered.setProps({
        value: [1, 2],
        variant: VARIANTS.TEXT_ONLY,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
