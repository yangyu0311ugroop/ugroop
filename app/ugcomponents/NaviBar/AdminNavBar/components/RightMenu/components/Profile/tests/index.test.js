import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Profile } from '../index';

describe('<Profile />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    ids: [1, 2],
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Profile {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Profile).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [{}]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
