import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourDetail } from '../index';

describe('<TourDetail />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {
      root: 'root',
    },
    templateId: 1,
    title: 'Tour',
    description: 'My Tour',
    dayIds: [1, 2, 3],
  };

  beforeEach(() => {
    rendered = shallow(<TourDetail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourDetail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
