import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateEntryListItem } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('TemplateEntryListItem', styles);

describe('TemplateEntryListItem', () => {
  let rendered;
  beforeEach(() => {
    rendered = shallow(
      <TemplateEntryListItem
        classes={mockStyles}
        type="folder"
        content="Jesus Christ is Lord"
        index={0}
        url="/sample"
      />,
    );
  });
  it('should render something based on default props', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render different icon if type is not folder', () => {
    rendered.setProps({
      type: 'template',
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
