import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import { AddTemplateModalBody } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('AddTemplateModalBody', stylesheet, theme);

describe('AddTemplateModalBody', () => {
  const mockProps = {
    formatMessage: jest.fn(),
    onTitleChange: jest.fn(),
    onDescriptionChange: jest.fn(),
    onDurationChange: jest.fn(),
    onDateChange: jest.fn(),
    onDayChange: jest.fn(),
    onClearLine: jest.fn(),
    classes: mockStyle,
    dateVal: 'example-date-val',
    dayVal: 0,
    moment: jest.fn(() => ({ add: () => '12-25-2017' })),
  };
  it('should render what it should render', () => {
    const wrapper = shallow(<AddTemplateModalBody {...mockProps} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render what it should render if error exist', () => {
    const wrapper = shallow(
      <AddTemplateModalBody errors="Something" {...mockProps} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
