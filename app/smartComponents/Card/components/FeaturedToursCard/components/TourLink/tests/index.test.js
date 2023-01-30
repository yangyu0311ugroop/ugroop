import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TourLink } from '../index';

describe('<TourLink />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const classes = {
    featuredLink: 'featuredLink',
  };

  const props = {
    id: '3',
    classes,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TourLink {...props} />);
  });

  it('should exists', () => {
    expect(TourLink).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render', () => {
    it('should render correctly', () => {
      rendered.setProps({ featuredTour: { content: 'Sample Tour' } });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
