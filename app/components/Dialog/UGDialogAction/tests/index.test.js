import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGDialogAction } from '../index';

const mockStyle = mockStylesheet('UGDialogAction', stylesheet);

describe('UGDialogAction component', () => {
  it('should render something', () => {
    const wrapper = shallow(
      <UGDialogAction classes={mockStyle} noPaddingTop />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
