import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import theme from 'theme/coolTheme';
import mockStylesheet from 'utils/mockStylesheet';
import { UGTab, stylesheet } from '../tab';

const mockStyle = mockStylesheet('UGTab', stylesheet, theme);

describe('UGTab', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(
      <UGTab
        classes={mockStyle}
        tabId={5}
        label="Be reconciled to God today!"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render lock if privateTab', () => {
    const wrapper = shallow(
      <UGTab privateTab classes={mockStyle} tabId={5} label="hi ho" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
