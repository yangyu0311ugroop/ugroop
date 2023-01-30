import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { GridItem } from '../index';

describe('<GridItem />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<GridItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(GridItem).toBeDefined();
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
