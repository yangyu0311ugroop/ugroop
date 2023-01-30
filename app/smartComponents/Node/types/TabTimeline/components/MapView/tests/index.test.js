import { ability } from 'apis/components/Ability/ability';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MapView } from '../index';

describe('<MapView />', () => {
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

    rendered = shallow(<MapView {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MapView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openAddRoute()', () => {
    it('should openAddRoute()', () => {
      PORTAL_HELPERS.openAddRoute = jest.fn(() => '');

      instance.openAddRoute();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddRoute);
    });
  });

  describe('renderLeft()', () => {
    it('should renderLeft', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({ clickId: 22, dayIds: [22] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty can edit', () => {
      ability.can = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });

    it('should renderEmpty', () => {
      ability.can = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      rendered.setProps({ routes: [] });

      expect(instance.render()).toBe('renderEmpty');
    });

    it('should render', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderContent = jest.fn(() => 'renderContent');
      rendered.setProps({ routes: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
