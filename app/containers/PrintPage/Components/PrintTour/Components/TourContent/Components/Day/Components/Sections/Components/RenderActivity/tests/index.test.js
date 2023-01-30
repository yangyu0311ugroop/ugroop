import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RenderActivity } from '../index';

describe('<RenderActivity />', () => {
  let rendered;
  let instance;
  const props = {
    photoId: '',
    activityId: 0,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<RenderActivity {...props} />);
    instance = rendered.instance();
  });
  it('should exists', () => {
    expect(RenderActivity).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should render correctly if content is empty', () => {
      rendered.setProps({ content: '' });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should render correctly if photo is empty', () => {
      rendered.setProps({ photoId: 1 });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
