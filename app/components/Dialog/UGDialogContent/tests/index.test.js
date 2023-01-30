import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGDialogContent } from '../index';

const mockStyle = mockStylesheet('UGDialogContent', stylesheet);

describe('UGDialogContent component', () => {
  it('should render something', () => {
    const wrapper = shallow(<UGDialogContent classes={mockStyle} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render something if noPaddingTop/Bottom', () => {
    const wrapper = shallow(
      <UGDialogContent classes={mockStyle} noPaddingTop noPaddingBottom />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
