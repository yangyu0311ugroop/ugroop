import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ActionButtons } from '../index';

describe('<ActionButtons />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    onCopy: jest.fn(),
    onMove: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    canMove: true,
  };

  beforeEach(() => {
    rendered = shallow(<ActionButtons {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ActionButtons).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClickMenu()', () => {
    it('should set anchorEl state to the currentTarget', () => {
      instance.handleClickMenu({ currentTarget: 'Jesus' });
      expect(rendered.state().anchorEl).toBe('Jesus');
    });
  });

  describe('handleCloseMenu()', () => {
    it('should set anchorEl state to null', () => {
      rendered.setState({ anchorEl: 'World' });
      instance.handleCloseMenu();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('handleEvents()', () => {
    it('should set anchorEl state to null before calling the event function', () => {
      rendered.setState({
        anchorEl: 'something',
      });
      const func = jest.fn();
      instance.handleEvents(func)();
      expect(rendered.state().anchorEl).toBe(null);
      expect(func).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
