import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateSearchField } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TemplateSearchField', styles);

describe('<TemplateSearchField />', () => {
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
    rendered = shallow(<TemplateSearchField {...props} />);
  });

  it('should exists', () => {
    expect(TemplateSearchField).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
