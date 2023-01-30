import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGDialogTitle } from '../index';

const mockStyle = mockStylesheet('UGDialogTitle', stylesheet);

describe('UGDialogTitle component', () => {
  it('should render something', () => {
    const wrapper = shallow(
      <UGDialogTitle classes={mockStyle}>Something!</UGDialogTitle>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render something if props.noPaddingBottom', () => {
    const wrapper = shallow(
      <UGDialogTitle classes={mockStyle} noPaddingBottom>
        Something!
      </UGDialogTitle>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
