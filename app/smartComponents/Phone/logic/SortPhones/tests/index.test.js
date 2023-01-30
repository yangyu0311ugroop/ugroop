import { shallow } from 'enzyme';
import React from 'react';
import { SortPhones } from '../index';

describe('<SortPhones />', () => {
  let rendered;

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
    rendered = shallow(<SortPhones {...props} />);
  });

  it('should exists', () => {
    expect(SortPhones).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should pass the sortedIds as function to children props', () => {
      expect(props.children).toBeCalledWith({ sortedIds: [] });
    });
  });
});
