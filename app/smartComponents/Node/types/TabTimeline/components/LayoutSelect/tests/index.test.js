import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LayoutSelect } from '../index';

describe('<LayoutSelect />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
    location: {},
    history,
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<LayoutSelect {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LayoutSelect).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleViewChange()', () => {
    it('should handleViewChange()', () => {
      instance.handleViewChange('some value')();

      TEST_HELPERS.expectCalled(history.push);
      TEST_HELPERS.expectCalled(resaga.setValue);
    });
    it('should handleViewChange to redirect to tabid()', () => {
      rendered.setProps({ timelineId: 1, visibleChildren: [1] });
      instance.handleViewChange('some value')();

      TEST_HELPERS.expectCalled(history.push);
      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderLayoutButton()', () => {
    it('should renderLayoutButton simple', () => {
      rendered.setProps({ simple: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutButton, [{}]);
    });

    it('should renderLayoutButton', () => {
      rendered.setProps({ simple: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutButton, [{}]);
    });
  });

  describe('renderLayoutMenu()', () => {
    it('should renderLayoutMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutMenu, [{}]);
    });
  });

  describe('openEventDialog()', () => {
    it('should openEventDialog()', () => {
      PORTAL_HELPERS.openViewEvent = jest.fn(() => '');

      instance.openEventDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render', () => {
      rendered.setProps({ row: true });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
