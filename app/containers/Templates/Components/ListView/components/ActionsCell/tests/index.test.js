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
    onCopy: jest.fn(),
    onMove: jest.fn(),
    onDeleteItem: jest.fn(),
    itemId: 1,
    canMove: true,
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
        itemType: 'folder',
        itemContent: 'qqq',
      });
      instance.onDeleteItem();
      expect(props.onDeleteItem).toBeCalledWith({
        id: props.itemId,
        title: 'qqq',
        type: 'folder',
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
            itemType: 'folder',
          },
        },
        {
          props: {
            itemType: 'template',
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
});
