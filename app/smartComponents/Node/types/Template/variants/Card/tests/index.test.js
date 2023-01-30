import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Card } from '../index';

describe('<Card />', () => {
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
    rendered = shallow(<Card {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Card).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTitle()', () => {
    it('should renderTitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });

  describe('renderLastViewed()', () => {
    it('should renderLastViewed', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLastViewed, [
        { timeSince: '1d', time: 'yesterday' },
      ]);
    });
  });

  describe('renderStartDate()', () => {
    it('should renderStartDate', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderStartDate, [
        { content: 'tomorrow' },
      ]);
    });
  });

  describe('renderShared()', () => {
    it('should return null', () => {
      rendered.setProps({ personal: false });

      expect(instance.renderShared()).toBe(null);
    });

    it('should render featured', () => {
      rendered.setProps({ personal: true, featuredTour: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShared);
    });

    it('should return null #2', () => {
      rendered.setProps({ personal: true, createdBy: 2, me: 2 });

      expect(instance.renderShared()).toBe(null);
    });

    it('should renderShared', () => {
      rendered.setProps({ personal: true, createdBy: 2, me: 3 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShared);
    });
  });

  describe('renderSubtitle()', () => {
    it('should renderSubtitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle);
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

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderTitle = jest.fn(() => 'renderTitle');
      instance.renderSubtitle = jest.fn(() => 'renderSubtitle');
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
