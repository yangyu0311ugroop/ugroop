import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TreeView, defaultFunc } from '../index';

describe('<TreeView />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<TreeView {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(TreeView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('defaultFunc', () => {
    it('should return undefined', () => {
      expect(defaultFunc()).toBe(undefined);
    });
  });

  describe('componentDidMount', () => {
    it('should set opened state with defaultExpanded if isOpenedFirstLevel is true', () => {
      rendered.setProps({
        isOpenedFirstLevel: true,
        defaultExpanded: [2],
      });
      instance.componentDidMount();
      expect(rendered.state().opened).toEqual([2]);
    });

    it('should set opened state with array of defaultExpanded if isOpenedFirstLevel is true', () => {
      rendered.setProps({
        isOpenedFirstLevel: true,
        defaultExpanded: [2, 3],
      });
      instance.componentDidMount();
      expect(rendered.state().opened).toEqual([2, 3]);
    });

    it('should not set opened state if isOpenedFirstLevel is false', () => {
      rendered.setProps({
        isOpenedFirstLevel: false,
        defaultExpanded: [2],
      });
      instance.componentDidMount();
      expect(rendered.state().opened).toEqual([]);
    });
  });

  describe('onReset()', () => {
    it('should reset state to original state', () => {
      const originalState = rendered.state();
      rendered.setState({
        opened: [1, 2],
      });
      instance.onReset();
      expect(rendered.state()).toEqual(originalState);
    });
  });

  describe('onNodeToggle()', () => {
    it('should set state', () => {
      rendered.setState({
        opened: [],
      });
      instance.onNodeToggle({ preventDefault: jest.fn() }, [1, 2]);
      expect(rendered.state().opened).toEqual([1, 2]);
    });
  });

  describe('onLabelClick()', () => {
    it('should add itemId in the opened state array if itemId is not yet in the array', () => {
      rendered.setState({ opened: [1] });
      const ev = { preventDefault: jest.fn() };
      instance.onLabelClick({ onClick: jest.fn(), nodeId: 1 })(ev);
      expect(ev.preventDefault).toBeCalled();
    });
    it('should remove itemId in the opened array state if the itemId already exist in the opened state', () => {
      rendered.setState({ opened: [1] });
      const ev = { preventDefault: jest.fn() };
      instance.onLabelClick({ onClick: jest.fn(), nodeId: 2 })(ev);
      expect(ev.preventDefault).not.toBeCalled();
    });
  });

  describe('renderIcon', () => {
    it('should render properly', () => {
      rendered.setProps({
        renderIcon: () => 'renderIcon',
      });
      instance.renderIcon(
        { id: 1 },
        {
          classes: {
            folderIcon: 'folderIcon',
            withMarginLeft: 'withMarginLeft',
            isWhite: 'isWhite',
          },
          isSelected: true,
          icon: '',
        },
      );
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render properly', () => {
      instance.renderIcon(
        { id: 1 },
        {
          classes: {
            folderIcon: 'folderIcon',
            withMarginLeft: 'withMarginLeft',
            isWhite: 'isWhite',
          },
          isSelected: true,
          icon: 'icon',
        },
      );
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('onSelect()', () => {
    it('should call onSelect props + set selected state with the item id selected', () => {
      instance.onReset = 'onReset';
      instance.onSelect(1, 'title')();
      expect(props.onSelect).toBeCalledWith(1, 'title', {
        reset: 'onReset',
      });
    });
  });

  describe('renderItem', () => {
    it('should render something', () => {
      rendered.setProps({
        icon: '',
        disabledFolderId: 99,
      });
      const item = {
        children: [],
        id: 1,
      };
      instance.renderItem(item);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render something if the item has children', () => {
      rendered.setProps({
        icon: '',
        disabledFolderId: 99,
      });
      rendered.setState({
        opened: [1],
      });
      const item = {
        children: [
          {
            content: '1',
            id: 1,
          },
        ],
        id: 1,
      };
      instance.renderItem(item);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render something if the item has children and the item isnt opened', () => {
      rendered.setProps({
        icon: '',
        disabledFolderId: 99,
      });
      rendered.setState({
        opened: [2],
      });
      const item = {
        children: [
          {
            content: '1',
            id: 1,
          },
        ],
        id: 1,
      };
      instance.renderItem(item);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render defaultExpanded as array of string', () => {
      rendered.setProps({ defaultExpanded: [1] });
      expect(instance.getDefaultSelected()).toEqual(['1']);
    });
    it('should render empty array', () => {
      rendered.setProps({ defaultExpanded: 'a' });
      expect(instance.getDefaultSelected()).toEqual([]);
    });
  });

  describe('render()', () => {
    it('should render something based on props', () => {
      const propsTable = [
        {
          props: {
            items: [{ id: 1, content: 'My Tours', children: [] }],
          },
        },
        {
          props: {
            items: [
              {
                id: 1,
                content: 'My Tours',
                children: [{ id: 2, content: 'AAA', children: [] }],
              },
            ],
          },
        },
        {
          props: {
            items: [
              {
                id: 1,
                content: 'My Tours',
                children: [
                  {
                    id: 2,
                    content: 'AAA',
                    children: [{ id: 3, content: 'BBB', children: [] }],
                  },
                ],
              },
            ],
            selected: 1,
          },
          state: {
            opened: [1],
          },
        },
        {
          props: {
            items: [
              {
                id: 1,
                content: 'My Tours',
                children: [
                  {
                    id: 2,
                    content: 'AAA',
                    children: [{ id: 3, content: 'BBB', children: [] }],
                  },
                ],
              },
            ],
            icon: 'folder',
            selected: 1,
          },
          state: {
            opened: [1],
          },
        },
        {
          props: {
            items: [
              {
                id: 1,
                content: 'My Tours',
                children: [
                  {
                    id: 2,
                    content: 'AAA',
                    children: [{ id: 3, content: 'BBB', children: [] }],
                  },
                ],
              },
            ],
            icon: 'folder',
            isOpenedFirstLevel: true,
            selected: 2,
          },
          state: {
            opened: [1],
          },
        },
      ];

      instance.renderItem = () => 'renderItem';

      propsTable.forEach(propTable => {
        rendered.setState(propTable.state);
        rendered.setProps(propTable.props);
        expect(toJSON(rendered)).toMatchSnapshot();
      });
    });
  });
});
