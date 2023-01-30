import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Attachment } from '../index';

describe('<Attachment />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    compact: true,
    darkSeparator: true,
  };

  beforeEach(() => {
    rendered = shallow(<Attachment {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Attachment).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should be able to stop propagation', () => {
      const ev = {
        stopPropagation: jest.fn(),
      };
      instance.handleLinkClick(ev);

      expect(ev.stopPropagation).toBeCalledWith();
    });
  });

  describe('renderDescription', () => {
    it('should call props.renderDescription if exists', () => {
      const description = 'description';
      const renderDescription = jest.fn();
      rendered.setProps({ description, renderDescription });
      expect(renderDescription).toBeCalledWith(description);
    });
  });

  describe('renderItemLink', () => {
    it('should return name if there is no link and there is a name', () => {
      expect(instance.renderItemLink('name', null)).toEqual('name');
    });
    it('should return No file string if there is no link and there is a name', () => {
      expect(instance.renderItemLink(null, null)).toEqual('No file');
    });
  });

  describe('renderDefault', () => {
    it('should render correctly given all props needed are present', () => {
      rendered.setProps({
        name: 'name',
        link: '/sample',
        description: 'sample desc',
      });
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly given not all props needed are present', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderMenuItems', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        names: ['name'],
        links: ['links'],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuItems);
    });
  });

  describe('renderPopper', () => {
    it('should match snapshot', () => {
      instance.renderPopperButton = jest.fn(() => 'renderPopperButton');
      instance.renderMenuItems = jest.fn(() => 'renderMenuItems');
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopper);
    });
  });

  describe('renderPopperButton', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPopperButton);
    });
  });

  describe('renderIcon', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        link: 'link',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
  });
  describe('renderList', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        link: 'link',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderList);
    });
  });

  describe('renderLink', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        link: 'link',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('renderThumbnail', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        link: 'thumbnail',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderThumbnail);
    });
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderThumbnail);
    });
  });

  describe('handleClickMenu', () => {
    it('should set state', () => {
      instance.handleClickMenu({ currentTarget: '1' });
      expect(rendered.state().anchorEl).toEqual('1');
    });
    it('should call handleCloseMenu if there is anchorEl', () => {
      rendered.setState({
        anchorEl: 'el',
      });
      instance.handleCloseMenu = jest.fn();
      instance.handleClickMenu();
      expect(instance.handleCloseMenu).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.componentWillUnmount();
      expect(global.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('handleCloseMenu', () => {
    it('should set state', () => {
      global.setTimeout = jest.fn();
      instance.handleCloseMenu();
      expect(global.setTimeout).toBeCalled();
    });
  });

  describe('handleClose', () => {
    it('should setState', () => {
      instance.handleClose();
      expect(rendered.state().anchorEl).toEqual(null);
    });
  });
});
