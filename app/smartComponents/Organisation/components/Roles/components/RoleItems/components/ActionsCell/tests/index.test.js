import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ActionsCell } from '../index';

describe('<ActionsCell />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    onEdit: jest.fn(),
    onDeleteItem: jest.fn(),
    onDeactivate: jest.fn(),
    onActivate: jest.fn(),
    itemId: 1,
    id: 1,
    active: false,
  };

  beforeEach(() => {
    rendered = shallow(<ActionsCell {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ActionsCell).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onDeleteItem', () => {
    it('should call onDeleteItem prop with a particular param shape', () => {
      rendered.setProps({
        id: 1,
      });
      instance.onDeleteItem();
      expect(props.onDeleteItem).toBeCalledWith({
        id: 1,
      });
    });
  });
  describe('handleMenuAction', () => {
    it('should set anchorEl to passed currentTarget', () => {
      instance.handleMenuAction({ currentTarget: 'Jesus' });
      expect(rendered.state().anchorEl).toBe('Jesus');
    });
  });

  describe('handleMenuClose', () => {
    it('should set anchorEl to null', () => {
      rendered.setState({
        anchorEl: 'World',
      });
      instance.handleMenuClose();
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
      const casesTable = [
        {
          props: {
            itemType: 'pending',
          },
        },
        {
          props: {
            itemType: 'confirmed',
          },
        },
      ];
      casesTable.forEach(caseTable => {
        rendered.setProps(caseTable.props);
        const snapshot = shallow(<div>{instance.render()}</div>);
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });
  });
  describe('render when member is active', () => {
    it('should render correctly when member is active', () => {
      rendered.setProps({ active: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('activate()', () => {
    it('onDeactivate should be called', () => {
      instance.activate();
      expect(props.onDeactivate).toBeCalled();
    });
  });
  describe('deactivate()', () => {
    it('onDeactivate should be called', () => {
      instance.deactivate();
      expect(props.onDeactivate).toBeCalled();
    });
  });
});
