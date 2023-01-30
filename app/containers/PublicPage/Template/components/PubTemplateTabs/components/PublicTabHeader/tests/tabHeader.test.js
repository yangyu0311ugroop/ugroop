import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';

import { TabHeader } from '../tabHeader';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('TabHeader', stylesheet);

describe('TabHeader', () => {
  let tabHeaderMockFunc;
  const data = [{ id: 1 }, { id: 2 }];
  beforeEach(() => {
    tabHeaderMockFunc = {
      onHandleTabChange: jest.fn(),
      onHandleStateChange: jest.fn(),
    };
  });
  it('should render what it should render', () => {
    const wrapper = shallow(
      <TabHeader data={data} more classes={mockStyle} {...tabHeaderMockFunc} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render loading', () => {
    const wrapper = shallow(
      <TabHeader more classes={mockStyle} {...tabHeaderMockFunc} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
