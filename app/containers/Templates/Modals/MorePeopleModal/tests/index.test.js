import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { MorePeopleModal } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('MorePeopleModal', styles);

describe('<MorePeopleModal />', () => {
  let rendered;

  const props = {
    classes: mockStyle,
    people: ['paulc123@g.com', 'paulc456@g.com'],
    onClose: jest.fn(),
    isOpen: false,
  };

  beforeEach(() => {
    rendered = shallow(<MorePeopleModal {...props} />);
  });

  it('should exists', () => {
    expect(MorePeopleModal).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render what it should render', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
