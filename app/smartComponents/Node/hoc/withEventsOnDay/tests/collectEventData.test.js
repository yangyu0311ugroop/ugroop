import { shallow } from 'enzyme';
import React from 'react';
import CollectEventData from '../collectEventData';
import { EVENT_GROUPINGS } from '../../../../../utils/constants/events';

jest.useFakeTimers();
describe('Shallow <CollectEventData />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    eventIds: [1, 2],
    id: 1,
    setEvents: jest.fn(),
    grouping: EVENT_GROUPINGS.singleDayEvents,
  };

  beforeEach(() => {
    rendered = shallow(<CollectEventData {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('componentDidUpdate', () => {
    instance.collectData = jest.fn();
    instance.componentDidUpdate({
      grouping: {
        name: 'ab',
      },
    });
    expect(instance.collectData).toBeCalled();
  });
  it('componentWillUnmount', () => {
    instance.collectData = jest.fn();
    instance.componentWillUnmount();
    expect(instance.debouncedFetchData).toBe(null);
  });
  it('debouncedFetchData', () => {
    instance.collectData = jest.fn();
    instance.debouncedCollect();
    expect(instance.debouncedFetchData).not.toBe(null);
  });
  it('collectData', () => {
    instance.items = {
      map: {
        get: () => ({
          props: {
            id: 1,
            type: 'a',
            subType: 'b',
            mode: 'c',
            timeZoneId: 'd',
            value: 'e',
            position: 'f',
            real: 'g',
            dayCount: 1,
          },
        }),
      },
    };
    instance.collectData();
    expect(props.setEvents).toBeCalled();
  });
});
