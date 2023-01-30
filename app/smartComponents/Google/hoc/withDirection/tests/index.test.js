import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import composedWithRecent, { withDirection } from '../index';

describe('withDirection', () => {
  let rendered;
  let instance;

  const Component = () => <div />;
  const Hoc = withDirection(Component);

  const route = jest.fn();
  const googleMaps = {
    DirectionsService: () => ({
      route,
    }),
  };

  const makeProps = () => ({
    resaga: {},
    googleMaps,
  });

  beforeEach(() => {
    rendered = shallow(<Hoc {...makeProps()} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withDirection).toBeDefined();
  });

  describe('findRoute()', () => {
    it('should call route', () => {
      rendered.setProps({ findRoute: [1, 2, 3], stars: [2] });
      instance.findRouteCallback = jest.fn();
      instance.directionsService = {
        route,
      };

      instance.findRoute({ payload: 123 });

      TEST_HELPERS.expectCalled(route);
    });
  });

  describe('findRouteCallback()', () => {
    it('should findRouteCallback() onSuccess', () => {
      const onSuccess = jest.fn();

      instance.findRouteCallback({ data: { index: 1122 }, onSuccess })(
        123,
        'OK',
      );

      TEST_HELPERS.expectCalledAndMatchSnapshot(onSuccess);
    });

    it('should findRouteCallback() onError', () => {
      const onError = jest.fn();

      instance.findRouteCallback({ data: { index: 1122 }, onError })(
        123,
        'NOT_FOUND',
      );

      TEST_HELPERS.expectCalledAndMatchSnapshot(onError);
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithRecent(Component)).toBeDefined();
    });
  });
});
