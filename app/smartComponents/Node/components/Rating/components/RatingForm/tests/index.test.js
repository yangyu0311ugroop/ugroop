import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { RatingForm } from '../index';

describe('<RatingForm />', () => {
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

    rendered = shallow(<RatingForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RatingForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSetValue()', () => {
    it('should handleSetValue()', () => {
      const setValue = jest.fn();
      const onChange = jest.fn();

      rendered.setProps({ setValue, onChange });

      instance.handleSetValue(5)();

      TEST_HELPERS.expectCalled(setValue, 5);
      TEST_HELPERS.expectCalled(onChange, 5);
    });
  });

  describe('renderLevel()', () => {
    it('should renderLevel', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLevel, [
        { value: 'value' },
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderLevel = jest.fn(() => 'renderLevel');
      rendered.setProps({ levels: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
