import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Likelihood } from '../index';

describe('<Likelihood />', () => {
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

    rendered = shallow(<Likelihood {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Likelihood).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    it('should handleChange()', () => {
      NODE_API_HELPERS.updateNode = jest.fn(() => '');

      instance.handleChange(55)();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.updateNode);
    });
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

  describe('renderContent()', () => {
    it('should return value', () => {
      instance.value = jest.fn(() => 'value');
      rendered.setProps({ editable: false });

      expect(instance.renderContent()).toBe('value');
    });

    it('should renderContent', () => {
      rendered.setProps({ editable: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
