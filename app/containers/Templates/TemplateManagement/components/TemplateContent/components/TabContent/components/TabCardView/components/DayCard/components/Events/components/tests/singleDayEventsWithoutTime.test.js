import { shallow } from 'enzyme';
import React from 'react';
import { SingleDayEventsWithoutTime } from '../singleDayEventsWithoutTime';

describe('<SingleDayEventsWithoutTime />', () => {
  let rendered;
  let instance;

  const renderEventIcon = jest.fn();
  const hasEvents = jest.fn();
  const props = {
    classes: {},
    singleDayEventsWithoutTime: [1, 2],
    id: 1,
    renderEventIcon,
    hasEvents,
  };

  beforeEach(() => {
    rendered = shallow(<SingleDayEventsWithoutTime {...props} />);
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
      { singleDayEventsWithoutTime: [2, 3, 4] },
      null,
    );
    expect(hasEvents).toBeCalled();
  });
});
