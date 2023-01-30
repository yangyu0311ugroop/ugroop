import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { ReadOnlyEditor } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('ReadOnlyEditor', stylesheet, theme);

describe('ReadOnlyEditor', () => {
  it('should render a read only RichTextEditor', () => {
    const wrapper = shallow(
      <ReadOnlyEditor
        value="Sample"
        classes={mockStyle}
        toolBarId="toolbarid"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
