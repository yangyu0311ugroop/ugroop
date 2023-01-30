import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Sections } from '../index';

describe('<Sections />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dayId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<Sections {...props} />);
    instance = rendered.instance();
  });
  it('should exists', () => {
    expect(Sections).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      rendered.setProps({ sections: [1, 2] });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
