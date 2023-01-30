import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { GridContainer } from '../index';

describe('<GridContainer />', () => {
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
    rendered = shallow(<GridContainer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(GridContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderCard()', () => {
    it('should renderCard', () => {
      TEST_HELPERS.expectDefined(instance.renderCard);
    });
  });

  describe('renderGrid()', () => {
    it('should renderGrid', () => {
      TEST_HELPERS.expectDefined(instance.renderGrid);
    });
  });

  describe('render()', () => {
    it('should renderCard', () => {
      rendered.setProps({ card: true });

      instance.renderCard = jest.fn(() => 'renderCard');

      expect(instance.render()).toBe('renderCard');
    });

    it('should renderGrid', () => {
      rendered.setProps({ card: false });

      instance.renderGrid = jest.fn(() => 'renderGrid');

      expect(instance.render()).toBe('renderGrid');
    });
  });
});
