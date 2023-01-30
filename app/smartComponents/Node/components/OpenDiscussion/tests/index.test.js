import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DAY } from 'utils/modelConstants';
import { OpenDiscussion } from '../index';

describe('<OpenDiscussion />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<OpenDiscussion {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OpenDiscussion).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('className()', () => {
    it('should className', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.className);
    });
  });

  describe('handleClick()', () => {
    it('should return null', () => {
      const onClick = jest.fn(() => 'onClick');

      rendered.setProps({ onClick });

      expect(instance.handleClick()).toBe('onClick');
    });

    it('should handleClick', () => {
      instance.openDayComment = jest.fn(() => 'openDayComment');
      rendered.setProps({ type: DAY });

      TEST_HELPERS.expectMatchSnapshot(instance.handleClick);
    });

    it('should DO_NOTHING', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleClick);
    });
  });

  describe('renderBadge()', () => {
    it('should return null', () => {
      instance.count = jest.fn(() => 0);

      expect(instance.renderBadge()).toBe(null);
    });

    it('should renderBadge', () => {
      instance.count = jest.fn(() => 3);

      TEST_HELPERS.expectMatchSnapshot(instance.renderBadge);
    });
  });

  describe('renderReadOnly()', () => {
    it('should renderReadOnly', () => {
      instance.renderBadge = jest.fn(() => 'renderBadge');

      TEST_HELPERS.expectMatchSnapshot(instance.renderReadOnly);
    });
  });

  describe('renderBadgeButton()', () => {
    it('should renderBadgeButton', () => {
      instance.renderReadOnly = jest.fn(() => 'renderReadOnly');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBadgeButton);
    });
  });

  describe('renderInline()', () => {
    it('should renderInline', () => {
      rendered.setProps({ label: 'Chat' });
      instance.renderBadge = jest.fn(() => 'renderBadge');

      TEST_HELPERS.expectMatchSnapshot(instance.renderInline);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      instance.renderReadOnly = jest.fn(() => 'renderReadOnly');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
  });

  describe('renderUnresolvedTopics()', () => {
    it('should return default', () => {
      instance.count = jest.fn(() => 0);

      TEST_HELPERS.expectMatchSnapshot(instance.renderUnresolvedTopics);
    });

    it('should renderUnresolvedTopics', () => {
      rendered.setProps({ count: 2 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderUnresolvedTopics);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.count = jest.fn(() => 0);
      rendered.setProps({ showEmpty: false });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      instance.renderBadge = jest.fn(() => 'renderBadge');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
