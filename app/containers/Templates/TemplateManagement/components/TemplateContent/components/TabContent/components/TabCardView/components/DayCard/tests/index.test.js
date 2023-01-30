import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { DayCard } from '../index';

describe('<DayCard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 1,
    classes: {},
    resaga,
  };

  jest.useFakeTimers();

  beforeEach(() => {
    rendered = shallow(<DayCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render something different if photoId exist', () => {
      rendered.setProps({
        photoId: '/photoId',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render something different if startDate exist', () => {
      rendered.setProps({
        startDate: '2018-04-07',
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
