import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DayCarousel } from '../index';

describe('<DayCarousel />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    dayIds: [1, 2, 3],
  };

  beforeEach(() => {
    rendered = shallow(<DayCarousel {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayCarousel).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(3);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
