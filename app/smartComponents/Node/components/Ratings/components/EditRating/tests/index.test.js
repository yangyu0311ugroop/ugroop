import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EditRating } from '../index';

describe('<EditRating />', () => {
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
    rendered = shallow(<EditRating {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditRating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleOpen', () => {
    it('should set open state to true', () => {
      instance.handleOpen();

      expect(rendered.state().open).toBe(true);
    });
  });

  describe('handleClose', () => {
    it('should set open state to false', () => {
      instance.handleClose();

      expect(rendered.state().open).toBe(false);
    });
  });

  describe('filterRating', () => {
    it('should return false if userRatingId is equal to ratingId', () => {
      expect(instance.filterRating(1)(1)).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
