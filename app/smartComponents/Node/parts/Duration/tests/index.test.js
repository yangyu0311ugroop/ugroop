import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Duration } from '../index';

describe('<Duration />', () => {
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

    rendered = shallow(<Duration {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Duration).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render !startDate', () => {
      rendered.setProps({ startDate: false, duration: 44 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render startDate', () => {
      rendered.setProps({ startDate: '2233' });

      expect(instance.render()).toBeDefined();
    });
  });
});
