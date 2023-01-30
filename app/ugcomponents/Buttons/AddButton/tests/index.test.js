import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddButton } from '../index';

describe('<AddButton />', () => {
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

    rendered = shallow(<AddButton {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCardButton()', () => {
    it('should renderCardButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCardButton);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.renderCardButton = jest.fn(() => 'renderCardButton');
      rendered.setProps({ card: true });

      expect(instance.render()).toBe('renderCardButton');
    });

    it('should render', () => {
      rendered.setProps({ card: false });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
