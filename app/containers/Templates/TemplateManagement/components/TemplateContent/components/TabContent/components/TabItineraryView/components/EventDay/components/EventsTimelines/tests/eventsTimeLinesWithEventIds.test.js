import { shallow } from 'enzyme';
import React from 'react';
import { EventsTimeLinesWithEventIds } from '../eventsTimeLinesWithEventIds';

describe('<EventsTimeLinesWithEventIds />', () => {
  let rendered;
  let instance;

  const renderEventIcon = jest.fn();
  const hasEvents = jest.fn();
  const props = {
    classes: {},
    eventIds: [1, 2],
    id: 1,
    isCardOpen: false,
    renderEventIcon,
    hasEvents,
  };

  beforeEach(() => {
    rendered = shallow(<EventsTimeLinesWithEventIds {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    instance.render();
    expect(rendered).toBeDefined();
  });
  it('shouldComponentUpdate', () => {
    expect(
      instance.shouldComponentUpdate(
        { id: 1, eventIds: [2, 3], isCardOpen: false },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 2, eventIds: [1, 2], isCardOpen: false },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 1, eventIds: [1, 2], isCardOpen: true },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 1, eventIds: [1, 2], isCardOpen: false },
        null,
        null,
      ),
    ).toBe(false);
  });
});
