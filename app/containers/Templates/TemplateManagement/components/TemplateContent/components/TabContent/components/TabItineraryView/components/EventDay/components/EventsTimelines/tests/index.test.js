import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EventsTimelines } from '../index';

describe('<EventsTimelines />', () => {
  let rendered;
  let instance;

  const props = {
    eventsWithTime: [],
    pinnedEvents: [],
  };

  beforeEach(() => {
    rendered = shallow(<EventsTimelines {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EventsTimelines).toBeDefined();
  });

  describe('splitEventIdsByTimeZone()', () => {
    beforeEach(() => {
      instance.setState({
        singleDayEventIds: [
          {},
          {
            id: 1,
            position: 'pos',
            value: MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
          },
        ],
        pinnedEventIds: [
          {
            id: 2,
            position: 'pos',
            value: MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
          },
        ],
      });
    });

    it('returns default', () => {
      instance.setState({ singleDayEventIds: [], pinnedEventIds: [] });
      expect(instance.splitEventIdsByTimeZone()).toEqual([
        {
          pinnedEventIds: [],
          singleDayEventIds: [],
          tz: '',
          tzOffset: '',
        },
      ]);
    });
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
