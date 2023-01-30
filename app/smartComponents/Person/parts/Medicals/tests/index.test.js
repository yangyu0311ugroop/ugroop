import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { Medicals } from '../index';

describe('<Medicals />', () => {
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
    rendered = shallow(<Medicals {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Medicals).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderMedical()', () => {
    it('should renderMedical', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMedical, []);
    });
  });

  describe('renderCreate()', () => {
    it('should renderMedical', () => {
      rendered.setProps({ readOnly: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderCreate);
    });
  });

  describe('renderMedicals()', () => {
    it('should return null', () => {
      rendered.setProps({ personMedicalsValue: [] });

      expect(instance.renderMedicals()).toBe(false);
    });

    it('should renderMedicals', () => {
      rendered.setProps({ personMedicalsValue: [1] });
      instance.renderMedical = jest.fn(() => () => 'renderMedical');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMedicals);
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
    it("should match snapshot if value's length is less than 1 and nomedical is true", () => {
      rendered.setProps({
        value: [],
        variant: VARIANTS.ICON,
        noMedical: true,
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
  });

  describe('VARIANTS.LOGIC', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        variant: VARIANTS.LOGIC,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('VARIANTS.ROW', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        variant: VARIANTS.ROW,
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should match snapshot if value is not empty array', () => {
      rendered.setProps({
        variant: VARIANTS.ROW,
        value: [1, 2],
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
