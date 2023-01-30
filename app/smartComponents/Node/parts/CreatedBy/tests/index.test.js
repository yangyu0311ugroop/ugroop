import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CreatedBy } from '../index';

describe('<CreatedBy />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<CreatedBy {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CreatedBy).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ createdBy: 0 });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ createdBy: 12 });

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAvatar()', () => {
    it('should return null', () => {
      rendered.setProps({ createdBy: 0 });

      expect(instance.renderAvatar()).toBe(null);
    });

    it('should renderAvatar', () => {
      rendered.setProps({ createdBy: 12 });

      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAvatarAndName()', () => {
    it('should return null', () => {
      rendered.setProps({ createdBy: 0 });

      expect(instance.renderAvatarAndName()).toBe(null);
    });

    it('should renderAvatarAndName', () => {
      rendered.setProps({ createdBy: 12 });

      const snapshot = shallow(<div>{instance.renderAvatarAndName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAvatarAndNameText()', () => {
    it('should return null', () => {
      rendered.setProps({ createdBy: 0 });

      expect(instance.renderAvatarAndNameText()).toBe(null);
    });

    it('should renderAvatarAndNameText', () => {
      rendered.setProps({ createdBy: 12 });

      const snapshot = shallow(<div>{instance.renderAvatarAndNameText()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderText()', () => {
    it('should renderText', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderText);
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
