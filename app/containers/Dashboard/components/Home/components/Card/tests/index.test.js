import { ORGANISATION_CARD } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Card, toggle } from '../index';

describe('toggle()', () => {
  it('should toggle() false', () => {
    expect(toggle(false)).toBe(true);
  });

  it('should toggle() true', () => {
    expect(toggle(true)).toBe(false);
  });
});

describe('<Card />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    name: ORGANISATION_CARD,
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

  describe('toggleOpen()', () => {
    it('should toggleOpen()', () => {
      instance.toggleOpen();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('renderCount()', () => {
    it('should return null', () => {
      rendered.setProps({ count: 0 });

      expect(instance.renderCount()).toBe(null);
    });

    it('should renderCount', () => {
      rendered.setProps({ count: 5, hide: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCount);
    });
  });

  describe('renderContent()', () => {
    it('should return null', () => {
      rendered.setProps({ hide: true });

      expect(instance.renderContent()).toBe(null);
    });

    it('should renderContent', () => {
      rendered.setProps({ hide: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderCount = jest.fn(() => 'renderCount');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
