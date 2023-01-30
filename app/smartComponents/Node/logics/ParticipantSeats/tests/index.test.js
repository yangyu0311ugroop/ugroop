import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { ParticipantSeats } from '../index';

describe('<ParticipantSeats />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    filteredIds: null,
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<ParticipantSeats {...props} />);
  });

  it('should exists', () => {
    expect(ParticipantSeats).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render correctly if filteredIds have value', () => {
    rendered.setProps({
      filteredIds: [1, 2, 3],
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render correctly if filteredIds have value and participantWithSeats have value', () => {
    rendered.setProps({
      filteredIds: [1, 2, 3],
      participantWithSeats: [1],
      participantWithoutSeats: [2, 3],
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});
