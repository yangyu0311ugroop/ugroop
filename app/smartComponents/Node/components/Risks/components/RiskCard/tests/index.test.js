import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RiskCard } from '../index';

describe('<RiskCard />', () => {
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

    rendered = shallow(<RiskCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RiskCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openAddRisk()', () => {
    it('should openAddRisk()', () => {
      PORTAL_HELPERS.openAddRisk = jest.fn(() => '');

      instance.openAddRisk();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddRisk);
    });
  });

  describe('selectRisk()', () => {
    it('should selectRisk()', () => {
      instance.selectRisk(55)();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderChildren()', () => {
    it('should return null', () => {
      expect(instance.renderChildren({ ids: [] })).toBe(null);
    });

    it('should renderChildren', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderChildren, [
        { ids: [1, 2] },
      ]);
    });
  });

  describe('renderRisk()', () => {
    it('should renderRisk', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRisk);
    });
  });

  describe('renderRisks()', () => {
    it('should return null', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      rendered.setProps({ risks: [] });

      expect(instance.renderRisks()).toBe('renderEmpty');
    });

    it('should renderRisks', () => {
      instance.renderRisk = jest.fn(() => 'renderRisk');
      rendered.setProps({ risks: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRisks);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderRisks = jest.fn(() => 'renderRisks');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
