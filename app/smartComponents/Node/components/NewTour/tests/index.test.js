import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NewTour } from '../index';

describe('<NewTour />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(() => 'dispatchTo'),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<NewTour {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NewTour).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openDialog()', () => {
    it('should openDialog()', () => {
      PORTAL_HELPERS.openAddTour = jest.fn();

      instance.openDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddTour);
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('render()', () => {
    it('should render children', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });
      instance.renderDefault = jest.fn(() => 'renderDefault');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
