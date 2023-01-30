import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourFetching } from '../index';

describe('<TourFetching />', () => {
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

  const children = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TourFetching {...props}>{children}</TourFetching>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourFetching).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('componentWillReceiveProps()', () => {
    it('should call updateTourFetching()', () => {
      rendered.setProps({ fetchEvents: false });
      instance.updateTourFetching = jest.fn(() => '');

      instance.componentWillReceiveProps({ fetchEvents: true });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.updateTourFetching);
    });

    it('should not call updateTourFetching()', () => {
      rendered.setProps({ fetchEvents: false });
      instance.updateTourFetching = jest.fn(() => '');

      instance.componentWillReceiveProps({ fetchEvents: false });

      expect(instance.updateTourFetching).not.toBeCalled();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
