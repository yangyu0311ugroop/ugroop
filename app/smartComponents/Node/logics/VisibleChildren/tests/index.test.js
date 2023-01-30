import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VisibleChildren } from '../index';

describe('<VisibleChildren />', () => {
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

    rendered = shallow(<VisibleChildren {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(VisibleChildren).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call handleChange', () => {
      instance.handleChange = jest.fn(() => 'handleChange');

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.handleChange);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call handleChange', () => {
      rendered.setProps({ visibleChildren: [1] });
      instance.handleChange = jest.fn(() => '');

      instance.componentWillReceiveProps({ visibleChildren: [1, 2] });

      TEST_HELPERS.expectCalled(instance.handleChange);
    });

    it('should NOT call handleChange', () => {
      rendered.setProps({
        visibleChildren: [1],
        privateIds: [],
        hiddenIds: [],
      });
      instance.handleChange = jest.fn(() => '');

      instance.componentWillReceiveProps({
        visibleChildren: [1],
        privateIds: [],
        hiddenIds: [],
      });

      TEST_HELPERS.expectNotCalled(instance.handleChange);
    });
  });

  describe('handleChange()', () => {
    it('should call setValue 1', () => {
      instance.handleChange({
        calculatedVisibleChildren: [1, 11],
        calculatedPrivateIds: [2],
        calculatedHiddenIds: [3],
        visibleChildren: [1],
        privateIds: [2],
        hiddenIds: [3],
      });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
    it('should call setValue 2', () => {
      instance.handleChange({
        calculatedVisibleChildren: [1],
        calculatedPrivateIds: [2, 22],
        calculatedHiddenIds: [3],
        visibleChildren: [1],
        privateIds: [2],
        hiddenIds: [3],
      });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
    it('should call setValue 1', () => {
      instance.handleChange({
        calculatedVisibleChildren: [1],
        calculatedPrivateIds: [2],
        calculatedHiddenIds: [3, 33],
        visibleChildren: [1],
        privateIds: [2],
        hiddenIds: [3],
      });

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should NOT call setValue', () => {
      instance.handleChange({
        calculatedVisibleChildren: [1],
        calculatedPrivateIds: [2],
        calculatedHiddenIds: [3],
        visibleChildren: [1],
        privateIds: [2],
        hiddenIds: [3],
      });

      expect(resaga.setValue).not.toBeCalledWith({ visibleChildren: [1] });
    });
  });

  describe('render()', () => {
    it('should render', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
