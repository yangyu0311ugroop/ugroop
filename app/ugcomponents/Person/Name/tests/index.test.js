import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Name } from '../index';

describe('Name/tests/index.test.js', () => {
  let rendered;
  let instance;

  const props = {
    id: 123,
    classes: { root: 'defaultRoot', img: 'defaultImg' },
  };

  beforeEach(() => {
    rendered = shallow(<Name {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<Name />', () => {
    it('should exists', () => {
      expect(Name).toBeDefined();
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

  describe('renderName()', () => {
    it('should render knownAs', () => {
      rendered.setProps({ knownAs: 'That Guy' });

      const snapshot = shallow(<div>{instance.renderName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render email', () => {
      rendered.setProps({ knownAs: '', email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderLink()', () => {
    it('should match snapshot if shouldRenderNewLink is true', () => {
      rendered.setProps({ shouldRenderNewLink: true });

      const snapshot = shallow(<div>{instance.renderLink()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render knownAs', () => {
      rendered.setProps({ email: 'That Guy' });

      const snapshot = shallow(<div>{instance.renderLink()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderProp()', () => {
    it('should render renderProp', () => {
      const snapshot = shallow(<div>{instance.renderProp()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLink', () => {
    it('should match snapshot', () => {
      instance.renderName = jest.fn(() => 'renderName');
      instance.renderPopover = jest.fn(() => 'renderPopover');
      rendered.setProps({
        className: 'className',
        email: 'zzz@yyy.com',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('renderProp', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        children: 'child',
      });
      instance.renderNameString = jest.fn(() => 'renderNameString');
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('renderText()', () => {
    it('should render knownAs', () => {
      rendered.setProps({ knownAs: 'That Guy' });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render email', () => {
      rendered.setProps({ knownAs: '', email: 'that@guy' });

      const snapshot = shallow(<div>{instance.renderText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0, email: '' });

      expect(instance.render()).toBe(null);
    });

    it('should render default', () => {
      rendered.setProps({
        email: 'that@guy',
        knownAs: 'That Guy',
        className: 'some class',
        orgId: 999,
      });
      rendered.setState({ anchorEl: 'some anchor' });
      instance.renderName = jest.fn(() => 'renderName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render default', () => {
      rendered.setProps({
        email: 'that@guy',
        knownAs: 'That Guy',
        className: 'some class',
        id: null,
      });
      rendered.setState({ anchorEl: 'some anchor' });
      instance.renderName = jest.fn(() => 'renderName');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
