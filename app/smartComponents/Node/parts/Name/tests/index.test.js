import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import { Name } from '..';

describe('<Name />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    firstName: 'firstName',
    lastName: 'lastName',
    isEllipsis: false,
  });

  beforeEach(() => {
    wrapper = shallow(<Name {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Comment).toBeDefined();
  });

  describe('#getAvatarProps()', () => {
    it('still matches snapshot', () => {
      expect(instance.getAvatarProps()).toMatchSnapshot();
    });

    it('returns existing if exists', () => {
      const AvatarProps = { x: 1 };
      wrapper.setProps({ AvatarProps });
      expect(instance.getAvatarProps()).toEqual({
        ...AvatarProps,
        className: null,
        imageSize: 'imageExtraSmall',
        sm: true,
        tooltipPlacement: 'bottom',
        tooltipText: '',
      });
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      wrapper.setProps({
        id: 1,
        personId: 2,
        userId: 3,
        readOnly: true,
      });
      instance.renderAvatar = jest.fn(() => 'renderAvatar');
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart);
    });
  });

  describe('#renderAvatar()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderAvatar()).toMatchSnapshot();
    });
    it('still matches snapshot if userId', () => {
      instance.getUserId = jest.fn(() => 1);
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvatar);
    });
    it('still matches snapshot if personId', () => {
      wrapper.setProps({
        personId: 1,
      });
      instance.getUserId = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderAvatar);
    });
  });

  describe('#renderAvatar()', () => {
    it('still matches snapshot', () => {
      const snap = shallow(<div>{instance.renderEditable()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('renderProps', () => {
    it('should match snapshot', () => {
      wrapper.setProps({
        children: jest.fn(() => 'children'),
      });
      const snap = shallow(<div>{instance.renderProp()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('#renderTextOnly()', () => {
    it('still matches snapshot if only props.lastName', () => {
      wrapper.setProps({ firstName: null });
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });

    it('still matches snapshot if has userId', () => {
      wrapper.setProps({
        renderValue: jest.fn(() => 'renderValue'),
      });
      instance.getUserId = jest.fn(() => 1);
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });

    it('still matches snapshot if has personId', () => {
      wrapper.setProps({
        renderValue: jest.fn(() => 'renderValue'),
        personId: 1,
      });
      instance.getUserId = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });

    it('still matches snapshot if has personId and valueOnly is true', () => {
      wrapper.setProps({
        renderValue: jest.fn(() => 'renderValue'),
        personId: 1,
        valueOnly: true,
      });
      instance.getUserId = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderTextOnly);
    });
    it('still matches snapshot if only props.ellipsis', () => {
      wrapper.setProps({ isEllipsis: true });
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
    it('still matches snapshot if no name', () => {
      wrapper.setProps({ firstName: null, lastName: null });
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
    it('still matches snapshot if no name', () => {
      wrapper.setProps({ firstName: null, lastName: null });
      expect(instance.renderTextOnly()).toMatchSnapshot();
    });
  });
  describe('#renderLink()', () => {
    it('still matches snapshot if only props.lastName', () => {
      wrapper.setProps({ firstName: null, userId: 1 });
      expect(instance.renderLink()).toMatchSnapshot();
    });

    it('still matches snapshot if no name, with person id', () => {
      wrapper.setProps({ firstName: null, lastName: null, personId: 1 });
      expect(instance.renderLink()).toMatchSnapshot();
    });
    it('still matches snapshot if no name', () => {
      wrapper.setProps({ firstName: null, lastName: null });
      expect(instance.renderLink()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
