import { ability } from 'apis/components/Ability/ability';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TabRiskAssessment } from '../index';

describe('<TabRiskAssessment />', () => {
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

    rendered = shallow(<TabRiskAssessment {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabRiskAssessment).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('canEdit()', () => {
    it('should canEdit()', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('openAdd()', () => {
    it('should openAdd()', () => {
      PORTAL_HELPERS.openAddHazard = jest.fn(() => '');

      instance.openAdd();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddHazard);
    });
  });

  describe('handleDeleteRisk()', () => {
    it('should handleDeleteRisk()', () => {
      instance.handleDeleteRisk();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderLeft()', () => {
    it('should renderLeft', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderContent()', () => {
    it('should render placeholder', () => {
      rendered.setProps({ selectedRiskId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should render placeholder 1', () => {
      rendered.setProps({ selectedRiskId: 111, risks: [11] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should renderContent', () => {
      instance.canEdit = jest.fn(() => true);
      rendered.setProps({ selectedRiskId: 99, risks: [99] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
