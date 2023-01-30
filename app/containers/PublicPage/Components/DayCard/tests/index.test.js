import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { DayCard } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('DayCard', styles);

describe('<DayCard />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
    dayCount: 1,
    imgSrc: 'https://loremflickr.com/320/240/paris',
  };

  beforeEach(() => {
    rendered = shallow(<DayCard {...props} />);
  });

  it('should exists', () => {
    expect(DayCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render imgPlaceholder', () => {
    rendered.setProps({ imgSrc: '' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
