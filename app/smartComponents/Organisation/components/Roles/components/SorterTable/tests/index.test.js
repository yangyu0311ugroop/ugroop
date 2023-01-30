import { shallow } from 'enzyme';
import React from 'react';
import { SorterTable } from '../index';

describe('<SorterTable />', () => {
  let rendered;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    columnSortBy: 'abcde',
    columnOrderBy: 'asc',
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<SorterTable {...props} />);
  });

  it('should exists', () => {
    expect(SorterTable).toBeDefined();
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
