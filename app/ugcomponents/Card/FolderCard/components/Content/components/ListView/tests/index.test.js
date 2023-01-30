import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateEntryListView } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TemplateEntryListView', styles);

describe('TemplateEntryListView', () => {
  let rendered;
  beforeEach(() => {
    rendered = shallow(
      <TemplateEntryListView classes={mockStyles} viewDelegate={{}} />,
    );
  });
  it('should render something based on default props', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
