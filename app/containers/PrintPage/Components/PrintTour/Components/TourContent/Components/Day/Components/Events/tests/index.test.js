import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Events } from '../index';

describe('<Events />', () => {
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
    dayCount: 1,
    events: { id: { id: 0 } },
  };
  beforeEach(() => {
    rendered = shallow(<Events {...props} />);
    instance = rendered.instance();
  });
  it('should exists', () => {
    expect(Events).toBeDefined();
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
