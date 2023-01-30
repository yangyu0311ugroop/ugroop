import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Roles } from '../index';

describe('<Roles />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    ids: [[1, 1], [2, 2], [3, 3]],
  };

  beforeEach(() => {
    rendered = shallow(<Roles {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Roles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('renderRows()', () => {
    it('should render correctly', () => {
      const sortedIds = [1, 2, 3];
      const snapshot = shallow(
        <div>{instance.renderRows()({ sortedIds })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleSort()', () => {
    it('should call handleSort', () => {
      rendered.setState({ columnToSort: 'abcde' });
      rendered.setState({ sortDirection: 'asc' });
      instance.handleSort('abcde')();

      expect(rendered.state().sortDirection).toBe('desc');
    });
    it('should not invert sortDirection if columnToSort is not the same with columnName selected', () => {
      rendered.setState({ columnToSort: 'abcde' });
      rendered.setState({ sortDirection: 'asc' });
      instance.handleSort('abcdef');

      expect(rendered.state().sortDirection).toBe('asc');
    });
    it('should not invert sortDirection if columnToSort is not the same with columnName selected', () => {
      rendered.setState({ columnToSort: 'abcde' });
      rendered.setState({ sortDirection: 'asc' });
      instance.handleSort();

      expect(rendered.state().sortDirection).toBe('asc');
    });
  });

  describe('renderTable()', () => {
    it('should render correctly', () => {
      // instance.getCanView = jest.fn(() => [[1, 1], [2, 2]]);
      instance.handleSort = jest.fn(() => () => 'abcde');
      // instance.canAccessSomething = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderTable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ ids: null });
      // instance.getCanView = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
