import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { SearchField } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TemplateSearchField', styles);

describe('<SearchField />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
    intl: {
      formatMessage: jest.fn(),
    },
    onChange: jest.fn(),
    onPressEnter: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<SearchField {...props} />);
  });

  it('should exists', () => {
    expect(SearchField).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
