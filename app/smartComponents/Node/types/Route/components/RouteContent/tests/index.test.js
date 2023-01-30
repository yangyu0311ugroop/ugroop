import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RouteContent } from '../index';

describe('<RouteContent />', () => {
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

    rendered = shallow(<RouteContent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RouteContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({
        originIndex: 2,
        destinationIndex: 4,
        distance: 2233,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
