import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Avatar } from '..';

describe('<Avatar />', () => {
  let rendered;
  let instance;

  const props = {
    classes: { root: 'defaultRoot', img: 'defaultImg' },
  };

  beforeEach(() => {
    rendered = shallow(<Avatar {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<Avatar />', () => {
    it('should exists', () => {
      expect(Avatar).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('handleClick()', () => {
    it('should set state', () => {
      instance.handleClick({
        preventDefault: jest.fn(),
        currentTarget: '123',
        stopPropagation: jest.fn(),
      });

      expect(rendered.state().anchorEl).toBe('123');
    });
  });

  describe('handleClose()', () => {
    it('should set state', () => {
      rendered.setState({ anchorEl: '123' });

      instance.handleClose();

      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('getStyle()', () => {
    it('should use default value', () => {
      expect(instance.getStyle()).toEqual({
        root: 'defaultRoot',
        img: 'defaultImg',
      });
    });

    it('should use props value', () => {
      rendered.setProps({ rootClass: 'propsRoot', imgClass: 'propsImg' });
      expect(instance.getStyle()).toEqual({
        root: 'propsRoot',
        img: 'propsImg',
      });
    });
  });

  describe('getName()', () => {
    it('returns first initial only if !props.displayFirstAndLastInitials', () => {
      rendered.setProps({ displayFirstAndLastInitials: false });
      expect(instance.getName('Name')).toEqual('N');
    });

    it('returns ? if no fullName', () => {
      expect(instance.getName('')).toEqual('?');
    });
  });

  describe('renderTitleEllipsis()', () => {
    it('renderTitleEllipsis has ellipsis', () => {
      rendered.setProps({ maxCharCountToEllipsis: 1 });
      expect(instance.renderTitleEllipsis('aaa')).toEqual('aaa...');
    });
  });

  describe('renderAvatar()', () => {
    it('should render question mark when nothing is given', () => {
      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render more', () => {
      rendered.setProps({ more: 5 });
      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render profileUrl', () => {
      rendered.setProps({
        profileUrl: 'image link',
        fullName: 'ping pong 123',
      });
      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render what is being passed to children props', () => {
      rendered.setProps({
        children: <p>Render letter avatar</p>,
      });
      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render the name when showFullName is true', () => {
      rendered.setProps({
        children: <p>Render letter avatar</p>,
        showFullName: true,
      });
      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render default', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should not include tooltip if noTooltip props is true', () => {
      rendered.setProps({
        noTooltip: true,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render more', () => {
      rendered.setProps({ more: 5 });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render first name and last name initials', () => {
      rendered.setProps({
        fullName: 'Name',
        displayFirstAndLastInitials: true,
      });
      let snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      rendered.setProps({
        fullName: 'Full Name',
        displayFirstAndLastInitials: true,
      });
      snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render custom tooltip text', () => {
      rendered.setProps({ fullName: 'Full Name', tooltipText: 'Tooltip Text' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render Button', () => {
      rendered.setProps({
        title: 'View person card',
        onClick: jest.fn(),
        className: 'some class',
        offsetLeft: true,
        offsetRight: true,
        userId: 1,
      });
      instance.renderButton = jest.fn(() => 'renderButton');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render no tooltip', () => {
      rendered.setProps({
        title: 'View person card',
        onClick: jest.fn(),
        className: 'some class',
        offsetLeft: true,
        offsetRight: true,
        userId: 1,
        noTooltip: true,
      });
      instance.renderButton = jest.fn(() => 'renderButton');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render sizes', () => {
      rendered.setProps({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        disableGrow: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render avatarOnly', () => {
      rendered.setProps({
        avatarOnly: true,
      });
      instance.renderAvatar = jest.fn(() => 'renderAvatar');

      expect(instance.render()).toBe('renderAvatar');
    });
  });
});
