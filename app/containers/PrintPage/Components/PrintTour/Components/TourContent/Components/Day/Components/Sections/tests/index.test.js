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
    sectionIds: [1, 2, 3],
    sections: { 1: { photos: [1] }, 2: { photos: [] } },
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
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('should render correctly when no sections', () => {
      rendered.setProps({ sectionIds: [] });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
