import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { EditableEditor } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('EditableEditor', stylesheet, theme);

describe('EditableEditor', () => {
  it('should render the editable editor without error', () => {
    const wrapper = shallow(
      <EditableEditor classes={mockStyle} toolBarId="toolbarid" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
