import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Empty } from '../index';

describe('<Empty />', () => {
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

    rendered = shallow(<Empty {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Empty).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTitle()', () => {
    it('should renderTitle', () => {
      rendered.setProps({ title: 'Details' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderTitle = jest.fn(() => 'renderTitle');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
