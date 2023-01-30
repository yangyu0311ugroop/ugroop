import { SORT_FILTERS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RatingFilter } from '../index';

describe('<RatingFilter />', () => {
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
    rendered = shallow(<RatingFilter {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RatingFilter).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount', () => {
    it('should set filter value to null', () => {
      instance.componentWillUnmount();

      expect(resaga.setValue).toBeCalledWith({ filter: SORT_FILTERS.LATEST });
    });
  });

  describe('handleClick', () => {
    it('should set filter value in redux store to whatever was being passed to it', () => {
      instance.handleClick('all')();

      expect(resaga.setValue).toBeCalledWith({ filter: 'all' });
    });
  });

  describe('renderFilterMenu', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderFilterMenu({ closeMenu: jest.fn() })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFilterButton', () => {
    it('should button with rate count', () => {
      const snapshot = shallow(<div>{instance.renderFilterButton(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderFilterButton = jest.fn(() => 'renderFilterButton');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
