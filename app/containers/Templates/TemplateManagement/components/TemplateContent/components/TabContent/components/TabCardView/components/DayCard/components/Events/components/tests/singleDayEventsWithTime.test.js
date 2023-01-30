import { shallow } from 'enzyme';
import React from 'react';
import { SingleDayEventsWithTime } from '../singleDayEventsWithTime';

describe('<SingleDayEventsWithTime />', () => {
  let rendered;
  let instance;

  const renderEventIcon = jest.fn();
  const hasEvents = jest.fn();
  const props = {
    classes: {},
    singleDayEventsWithTime: [1, 2],
    id: 1,
    renderEventIcon,
    hasEvents,
  };

  beforeEach(() => {
    rendered = shallow(<SingleDayEventsWithTime {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    instance.render();
    expect(rendered).toBeDefined();
    expect(renderEventIcon).toBeCalled();
  });
  it('componentDidUpdate', () => {
    instance.componentDidUpdate(
      {
        singleDayEventsWithTime: [2, 3, 4],
      },
      null,
      null,
    );
    expect(hasEvents).toBeCalled();
  });
});
