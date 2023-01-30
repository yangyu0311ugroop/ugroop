import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGDialogText } from '../index';

const mockStyle = mockStylesheet('UGDialogText', stylesheet);

describe('UGDialogText component', () => {
  it('should render something', () => {
    const wrapper = shallow(
      <UGDialogText classes={mockStyle}>Jesus!</UGDialogText>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
