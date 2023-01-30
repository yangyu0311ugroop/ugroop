import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PairRelatedId } from '../index';

describe('<PairRelatedId />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<PairRelatedId {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PairRelatedId).toBeDefined();
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
