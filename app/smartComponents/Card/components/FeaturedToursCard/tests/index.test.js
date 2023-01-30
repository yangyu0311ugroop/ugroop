import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST } from 'apis/constants';
import { FeaturedToursCard } from '../index';

describe('<FeaturedToursCard />', () => {
  let rendered;
  let instance;
  let snapshot;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const classes = {
    root: 'root',
    fixHeight: 'fixHeight',
    featuredList: 'featuredList',
    featuredListItem: 'featuredListItem',
    featuredLink: 'featuredLink',
  };

  const intl = {
    formatMessage: m => m.id,
  };

  const props = {
    classes,
    resaga,
    intl,
  };

  beforeEach(() => {
    rendered = shallow(<FeaturedToursCard {...props} />, {
      disableLifeCycleMethods: true,
    });
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FeaturedToursCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should call resaga dispatchTo', () => {
      instance.componentDidMount();
      expect(resaga.dispatchTo).toHaveBeenCalledWith(
        TEMPLATE_API,
        GET_TEMPLATE_FEATURED_LIST,
        {},
      );
    });
  });

  describe('renderHeader', () => {
    it('should render correctly', () => {
      snapshot = shallow(instance.renderHeader());
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmpty', () => {
    it('should render correctly', () => {
      snapshot = shallow(instance.renderEmpty());
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLoadiing', () => {
    it('should render correctly', () => {
      snapshot = shallow(instance.renderLoading());
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent', () => {
    it('should renderLoading', () => {
      rendered.setProps({ fetchingFeaturedTours: true });
      instance = rendered.instance();
      instance.renderLoading = jest.fn(() => 'renderLoading');

      expect(instance.renderContent()).toBe('renderLoading');
    });

    it('should renderEmpty', () => {
      rendered.setProps({ fetchingFeaturedTours: false });
      instance = rendered.instance();
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.renderContent()).toBe('renderEmpty');
    });

    it('should render content if there are featured tours', () => {
      const featuredTours = {
        2: { content: 'Tour 2' },
        1: { content: 'Tour 1' },
      };
      rendered.setProps({ fetchingFeaturedTours: false, featuredTours });
      instance = rendered.instance();

      expect(instance.renderContent()).toBeDefined();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      const featuredTours = {
        2: { content: 'Tour 2' },
        1: { content: 'Tour 1' },
      };
      rendered.setProps({ featuredTours });
      instance = rendered.instance();

      expect(instance.render()).toBeDefined();
    });

    it('should renderContent', () => {
      rendered.setProps({ showContent: true });
      instance = rendered.instance();
      instance.renderContent = jest.fn(() => 'renderContent');

      expect(instance.render()).toBeDefined();
    });
  });
});
