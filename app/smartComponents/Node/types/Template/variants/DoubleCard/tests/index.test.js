import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DoubleCard } from '../index';

describe('<DoubleCard />', () => {
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
    rendered = shallow(<DoubleCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DoubleCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTitle()', () => {
    it('should renderTitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto);
    });
  });

  describe('renderStarButton()', () => {
    it('should renderStarButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderStarButton, [
        { starred: true },
      ]);
    });
  });

  describe('renderLastViewed()', () => {
    it('should renderLastViewed', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLastViewed, [
        { timeSince: '1d', time: 'yesterday' },
      ]);
    });
  });

  describe('onClickNav()', () => {
    it('should onClickNav', () => {
      rendered.setProps({ history: { push: jest.fn() } });
      TEST_HELPERS.expectMatchSnapshot(instance.onClickNav, [
        { stopPropagation: jest.fn() },
      ]);
    });
    it('should onClickNav show publish', () => {
      rendered.setProps({ history: { push: jest.fn() }, showPublish: true });
      TEST_HELPERS.expectMatchSnapshot(instance.onClickNav, [
        { stopPropagation: jest.fn() },
      ]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ isActionBtn: true });
      instance.renderTitle = jest.fn(() => 'renderTitle');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render clickable', () => {
      rendered.setProps({ isClickable: true });
      instance.renderContent = jest.fn(() => 'renderTitle');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
