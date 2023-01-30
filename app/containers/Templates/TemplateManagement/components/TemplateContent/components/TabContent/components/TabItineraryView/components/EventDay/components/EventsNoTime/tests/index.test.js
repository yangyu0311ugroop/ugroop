import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EventsNoTime } from '../index';

describe('<EventsNoTime />', () => {
  let rendered;

  const props = {
    classes: {},
    events: [],
  };

  beforeEach(() => {
    rendered = shallow(<EventsNoTime {...props} />);
  });

  it('should exists', () => {
    expect(EventsNoTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should match snapshot if events have 3 values', () => {
      const events = [
        { id: 1, position: 'start', dayCount: 1 },
        { id: 2, position: 'start', dayCount: 2 },
        { id: 3, position: 'start', dayCount: 2 },
      ];
      rendered.setProps({ events });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
