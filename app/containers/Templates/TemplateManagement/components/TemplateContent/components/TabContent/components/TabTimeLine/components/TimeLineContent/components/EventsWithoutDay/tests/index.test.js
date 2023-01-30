/**
 * Created by stephenkarpinskyj on 2/11/18.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EVENT_HELPERS } from 'utils/helpers/events';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EventsWithoutDay } from '..';

describe('<EventsWithoutDay />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      item: 'item',
      itemBottom: 'itemBottom',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    idsNotOnStartDate: [{ id: 1 }],
    bottom: true,
  });

  Date.now = jest.fn(() => 'now');
  EVENT_HELPERS.canCreateEvent = jest.fn(() => true);

  beforeEach(() => {
    wrapper = shallow(<EventsWithoutDay {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(EventsWithoutDay).toBeDefined();
  });

  describe('#handleCreateEventClick()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleCreateEventClick();
    });
  });

  describe('toggleSticky()', () => {
    it('should toggleSticky()', () => {
      wrapper.setState({ sticky: true });

      instance.toggleSticky();

      expect(wrapper.state().sticky).toBe(false);
    });
  });

  describe('renderEventIcon()', () => {
    it('should renderEventIcon', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventIcon, [{}]);
    });
  });

  describe('renderCreateButton()', () => {
    it('should renderCreateButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCreateButton);
    });
  });

  describe('renderTitle()', () => {
    it('should render portalId', () => {
      wrapper.setProps({ portalId: 112 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });

    it('should render portalId onClose', () => {
      wrapper.setProps({ portalId: 112, onClose: () => {} });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });

    it('should renderTitle', () => {
      wrapper.setProps({ portalId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTitle);
    });
  });

  describe('renderCloseButton()', () => {
    it('should return null', () => {
      wrapper.setProps({ onClose: null });

      expect(instance.renderCloseButton()).toBe(null);
    });

    it('should renderCloseButton', () => {
      wrapper.setProps({ onClose: jest.fn });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCloseButton);
    });
  });

  describe('renderEventIcons()', () => {
    it('should renderEventIcons', () => {
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventIcons, [[1]]);
    });
  });

  describe('toggleShow()', () => {
    it('should toggleShow()', () => {
      wrapper.setState({ showAll: true });

      instance.toggleShow();

      expect(wrapper.state().showAll).toBe(false);
    });
  });

  describe('renderGoTo()', () => {
    it('should return null 1', () => {
      wrapper.setProps({ maxContent: 0 });
      instance.getEventIds = jest.fn(() => [1]);

      expect(instance.renderGoTo()).toBe(null);
    });

    it('should return null 2', () => {
      wrapper.setProps({ maxContent: 2 });
      instance.getEventIds = jest.fn(() => [1, 2]);

      expect(instance.renderGoTo()).toBe(null);
    });

    it('should renderGoTo', () => {
      wrapper.setProps({ maxContent: 2 });
      instance.getEventIds = jest.fn(() => [1, 2, 3]);

      TEST_HELPERS.expectMatchSnapshot(instance.renderGoTo);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('show empty', () => {
      wrapper.setProps({ showEmpty: true });
      instance.renderEventIcons = jest.fn(() => null);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('render children', () => {
      wrapper.setProps({ children: 'children' });
      instance.renderEventIcons = jest.fn(() => null);

      expect(instance.render()).toBe('children');
    });

    it('still matches snapshot', () => {
      instance.renderEventIcons = jest.fn(() => 'events');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
