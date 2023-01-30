import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourBy } from '../index';

describe('<TourBy />', () => {
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

    rendered = shallow(<TourBy {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourBy).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ organisationId: 2233 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      rendered.setProps({ organisationId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
