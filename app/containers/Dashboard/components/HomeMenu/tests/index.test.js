import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { HomeMenu } from '../index';

describe('<HomeMenu />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(() => 'dispatchTo'),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<HomeMenu {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(HomeMenu).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should return fetchRecent', () => {
      rendered.setProps({ fetchRecent: false });
      instance.fetchRecent = jest.fn(() => 'fetchRecent');

      expect(instance.componentDidMount()).toBe('fetchRecent');
    });

    it('should return fetchFeatured', () => {
      rendered.setProps({ fetchRecent: true });
      instance.fetchFeatured = jest.fn(() => 'fetchFeatured');

      expect(instance.componentDidMount()).toBe('fetchFeatured');
    });
  });

  describe('fetchFeatured()', () => {
    it('should DO_NOTHING', () => {
      rendered.setProps({ fetchFeatured: true });

      expect(instance.fetchFeatured()).toBe(DO_NOTHING);
    });

    it('should call dispatchTo', () => {
      rendered.setProps({ fetchFeatured: false });

      instance.fetchFeatured();

      expect(instance.fetchFeatured()).toBe('dispatchTo');
    });
  });

  describe('renderCards()', () => {
    it('should renderCards', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCards, [
        { stars: [], recent: [] },
      ]);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
