import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import ParticipantSeats from 'smartComponents/Node/logics/ParticipantSeats';

import { SeatForm } from '../index';

describe('<SeatForm />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<SeatForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SeatForm).toBeDefined();
  });

  it('should render correctly', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render correctly with participant data render prop', () => {
    const snapshot = rendered.find(ParticipantSeats).renderProp('children')([]);

    expect(toJSON(snapshot)).toMatchSnapshot();
  });

  describe('getValue', () => {
    it('should return default value if mode is not edit', () => {
      rendered.setProps({
        seatNumber: 1,
      });

      expect(instance.getValue('seatNumber')).toBe(0);
    });

    it('should return target props value if mode is edit', () => {
      rendered.setProps({
        seatNumber: 1,
        mode: 'edit',
      });

      expect(instance.getValue('seatNumber')).toBe(1);
    });
  });
});
