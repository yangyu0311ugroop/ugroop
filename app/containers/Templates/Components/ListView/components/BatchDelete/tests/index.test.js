import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { BatchDelete } from '../index';
import styles from '../styles';

const mockStyles = mockStylesheet('BatchDelete', styles);

describe('<BatchDelete />', () => {
  let rendered;

  const props = {
    classes: mockStyles,
    onBatchDeleteClicked: jest.fn(),
    isBatchDeleteLoading: false,
  };

  beforeEach(() => {
    rendered = shallow(<BatchDelete {...props} />);
  });

  it('should exists', () => {
    expect(BatchDelete).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something if batch delete is loading', () => {
    rendered.setProps({
      isBatchDeleteLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
