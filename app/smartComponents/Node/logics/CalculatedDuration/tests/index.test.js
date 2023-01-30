import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CalculatedDuration } from '../index';

describe('<CalculatedDuration />', () => {
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

    rendered = shallow(<CalculatedDuration {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CalculatedDuration).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount', () => {
      rendered.setProps({ childrenCount: 3, duration: 2 });
      instance.updateDuration = jest.fn();

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.updateDuration);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps()', () => {
      rendered.setProps({ childrenCount: 4, duration: 4 });
      instance.updateDuration = jest.fn();

      instance.componentWillReceiveProps({ childrenCount: 5 });

      TEST_HELPERS.expectCalled(instance.updateDuration);
    });
  });

  describe('updateDuration()', () => {
    it('should updateDuration()', () => {
      rendered.setProps({ updatingNode: false });

      instance.updateDuration(5);

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });

    it('should NOT updateDuration()', () => {
      rendered.setProps({ updatingNode: true });

      instance.updateDuration(5);

      TEST_HELPERS.expectNotCalled(resaga.dispatchTo);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
