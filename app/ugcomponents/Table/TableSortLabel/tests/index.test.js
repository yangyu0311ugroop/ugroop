import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TableSortLabel } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TableSortLabel', styles);

describe('<TableSortLabel />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
  };

  beforeEach(() => {
    rendered = shallow(<TableSortLabel {...props} />);
  });

  it('should exists', () => {
    expect(TableSortLabel).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should show icon if showIcon is true', () => {
    rendered.setProps({
      showIcon: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should use chevron up if sort is desc and showIcon is true', () => {
    rendered.setProps({
      showIcon: true,
      sort: 'desc',
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should use loading if isLoading is true', () => {
    rendered.setProps({
      showIcon: true,
      sort: 'desc',
      isLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
