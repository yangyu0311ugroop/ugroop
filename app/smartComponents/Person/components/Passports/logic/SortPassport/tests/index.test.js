import { shallow } from 'enzyme';
import React from 'react';
import { SortPassport } from '../index';

describe('<SortPassport />', () => {
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
    rendered = shallow(<SortPassport {...props} />);
  });

  it('should exists', () => {
    expect(SortPassport).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should pass to children sortedIds', () => {
      expect(props.children).toBeCalledWith({ sortedIds: [] });
    });
  });
});
