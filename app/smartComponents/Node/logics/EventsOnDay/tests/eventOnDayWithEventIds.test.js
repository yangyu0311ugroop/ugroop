import { shallow } from 'enzyme';
import React from 'react';
import { EventOnDayWithEventIds } from '../eventOnDayWithEventIds';

describe('<EventOnDayWithEventIds />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    eventIds: [1, 2],
    id: 1,
    variant: 'a',
  };

  beforeEach(() => {
    rendered = shallow(<EventOnDayWithEventIds {...props} />);
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
        { id: 1, eventIds: [2, 3], variant: 'a' },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 2, eventIds: [1, 2], variant: 'a' },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 1, eventIds: [1, 2], variant: 'b' },
        null,
        null,
      ),
    ).toBe(true);
    expect(
      instance.shouldComponentUpdate(
        { id: 1, eventIds: [1, 2], variant: 'a' },
        null,
        null,
      ),
    ).toBe(false);
  });
});
