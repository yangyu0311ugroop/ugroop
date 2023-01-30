import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CopyTabOther } from '../index';

describe('<CopyTabOther />', () => {
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

    rendered = shallow(<CopyTabOther {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CopyTabOther).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleClose();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount', () => {
      instance.fetUserTour = jest.fn();
      rendered.setProps({ fetchTour: true });
      instance.componentDidMount();
      expect(instance.fetUserTour).toBeCalled();
    });
  });
  describe('fetchAbilityDone()', () => {
    it('should fetchAbilityDone to false', () => {
      instance.fetchAbilityDone();
      expect(rendered.state().loading).toEqual(false);
    });
  });

  describe('fetUserTour()', () => {
    it('should fetUserTour to false', () => {
      instance.fetUserTour();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('onSuccess()', () => {
    it('should onSuccess copy', () => {
      rendered.setProps({ action: 'copy' });
      TEST_HELPERS.expectMatchSnapshot(instance.onSuccess);
    });

    it('should onSuccess move', () => {
      rendered.setProps({ action: 'move' });
      TEST_HELPERS.expectMatchSnapshot(instance.onSuccess);
    });
  });

  describe('renderTourLink()', () => {
    it('should renderTourLink to return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourLink, []);
    });
    it('should renderTourLink to match with snapshots', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourLink, [1]);
    });
  });

  describe('renderTours()', () => {
    it('should render', () => {
      rendered.setProps({ tours: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
