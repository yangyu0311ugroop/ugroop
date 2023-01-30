import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { BothTime } from '../index';

// TODO: will update tests
describe('<BothTime />', () => {
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

    rendered = shallow(<BothTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BothTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
