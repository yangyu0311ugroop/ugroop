import { shallow } from 'enzyme';
import React from 'react';
import { ResetEventData } from '../resetEventData';

describe('<ResetEventData />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    eventIds: [],
    id: 1,
    setEvents: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<ResetEventData {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    instance.render();
    expect(rendered).toBeDefined();
  });
  it('componentDidUpdate', () => {
    instance.componentDidUpdate({ eventIds: [] }, null, null);
    expect(props.setEvents).toBeCalled();
  });
});
