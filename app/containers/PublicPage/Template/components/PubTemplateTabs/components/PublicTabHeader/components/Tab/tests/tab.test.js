import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { PublicTab, stylesheet } from '../tab';

const mockStyle = mockStylesheet('PublicTab', stylesheet);

describe('PublicTab', () => {
  it('should render what it should render', () => {
    const wrapper = shallow(
      <PublicTab
        classes={mockStyle}
        tabId={5}
        label="Be reconciled to God today!"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
