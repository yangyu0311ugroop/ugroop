import { shallow } from 'enzyme';
import React from 'react';
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TransportationMap } from '../index';

describe('<TransportationMap />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const findRoute = jest.fn();

  const props = {
    classes: {},
    resaga,
    findRoute,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TransportationMap {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransportationMap).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('findDirections()', () => {
    it('should !placeIdStart', () => {
      expect(instance.findDirections()).toBe(null);
    });

    it('should !placeIdEnd', () => {
      expect(instance.findDirections('start')).toBe(null);
    });

    it('should findDirections', () => {
      instance.findDirections('start', 'end');

      TEST_HELPERS.expectCalled(findRoute);
    });
  });

  describe('findDirectionsCb()', () => {
    it('should return !OK', () => {
      expect(instance.findDirectionsCb({}, 'ERROR')).toBe(null);
    });

    it('should findDirectionsCb', () => {
      GOOGLE_API_HELPERS.normaliseData = jest.fn(() => ({}));
      GOOGLE_API_HELPERS.normaliseLegs = jest.fn(() => ({
        distance: 12,
        duration: '1 hour',
      }));

      instance.findDirectionsCb({}, 'OK');

      expect(rendered.state().distance).toBe(12);
      expect(rendered.state().duration).toBe('1 hour');
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setState({ distance: 12, duration: '1 hour' });
      EVENT_VIEW_HELPERS.transportationStartName = jest.fn(() => false);
      EVENT_VIEW_HELPERS.transportationEndName = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render mapOnly', () => {
      rendered.setProps({ mapOnly: true });
      rendered.setState({ distance: 12, duration: '1 hour' });
      EVENT_VIEW_HELPERS.transportationStartName = jest.fn(() => false);
      EVENT_VIEW_HELPERS.transportationEndName = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render has location', () => {
      rendered.setState({ distance: 12, duration: '1 hour' });
      EVENT_VIEW_HELPERS.transportationStartName = jest.fn(() => 'start');
      EVENT_VIEW_HELPERS.transportationEndName = jest.fn(() => 'end');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
