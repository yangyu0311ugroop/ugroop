import { shallow } from 'enzyme';
import React from 'react';
import { NonSingleDayEvents } from '../nonSingleDayEvents';

describe('<NonSingleDayEvents />', () => {
  let rendered;
  let instance;

  const renderEventIcon = jest.fn();
  const hasEvents = jest.fn();
  const props = {
    classes: {},
    nonSingleDayEvents: [1, 2],
    id: 1,
    renderEventIcon,
    hasEvents,
  };

  beforeEach(() => {
    rendered = shallow(<NonSingleDayEvents {...props} />);
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
        nonSingleDayEvents: [2, 3, 4],
      },
      null,
      null,
    );
    expect(hasEvents).toBeCalled();
  });
});
