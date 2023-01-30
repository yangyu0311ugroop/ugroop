import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { HIDDEN } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Visibility } from '../index';

describe('<Visibility />', () => {
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

    rendered = shallow(<Visibility {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Visibility).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onSuccess()', () => {
    it('should onSuccess()', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });

      instance.onSuccess()();

      TEST_HELPERS.expectCalled(onSuccess);
    });
  });

  describe('toggle()', () => {
    it('should toggle()', () => {
      NODE_API_HELPERS.updateNode = jest.fn(() => '');

      instance.toggle();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.updateNode);
    });
  });

  describe('renderCheckbox()', () => {
    it('should renderCheckbox', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckbox);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ children: 'children', status: HIDDEN });

      expect(instance.render()).toBe(null);
    });

    it('should return children', () => {
      rendered.setProps({ children: 'children', status: 'not hidden' });

      expect(instance.render()).toBe('children');
    });

    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      expect(instance.render()).toBe('LOGIC_HELPERS.switchCase');
    });
  });
});
