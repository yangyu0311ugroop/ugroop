import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourHeader } from '../index';

describe('<TourHeader />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    id: 'photo.jpg',
  };

  beforeEach(() => {
    rendered = shallow(<TourHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourHeader).toBeDefined();
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
