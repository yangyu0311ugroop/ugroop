import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Rating } from '../index';

describe('<Rating />', () => {
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

    rendered = shallow(<Rating {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Rating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderForm()', () => {
    it('should renderForm', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderForm);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
