import { shallow } from 'enzyme';
import React from 'react';
import { AttachmentWithEventIds } from '../attachmentWithEventIds';

describe('<AttchmentWithEventIds />', () => {
  let rendered;
  let instance;

  const renderEventIcon = jest.fn();
  const hasEvents = jest.fn();
  const props = {
    classes: {},
    eventIds: [1, 2],
    id: 1,
    renderEventIcon,
    hasEvents,
  };

  beforeEach(() => {
    rendered = shallow(<AttachmentWithEventIds {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    instance.render();
    expect(rendered).toBeDefined();
  });
  it('shouldComponentUpdate', () => {
    expect(
      instance.shouldComponentUpdate({ id: 1, eventIds: [2, 3] }, null, null),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate({ id: 2, eventIds: [1, 2] }, null, null),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate({ id: 1, eventIds: [1, 2] }, null, null),
    ).toBe(false);
  });
});
