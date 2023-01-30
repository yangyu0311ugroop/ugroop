import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DayImg } from '../index';

describe('<DayImg />', () => {
  let rendered;
  let instance;

  const props = {
    id: 1,
    classes: {},
    selected: true,
    photoId: '/photo.jpg',
  };

  beforeEach(() => {
    rendered = shallow(<DayImg {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayImg).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render w/o photoId', () => {
      rendered.setProps({ photoId: '' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
