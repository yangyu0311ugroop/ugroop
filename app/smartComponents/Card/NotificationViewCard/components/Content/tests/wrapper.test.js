import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ContentWrapper } from '../wrapper';
import {
  NOTIFICATION_API,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from '../../../../../../apis/constants';

describe('Notification View Card - ContentWrapper', () => {
  let rendered;
  let rendered2;
  let instance;
  let instance2;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    nodeId: 1,
    senderId: 1,
    createAt: '2018-01-01',
    previousCreatedAt: '2018-01-01',
    userId: 2,
    id: 2,
  };

  const props2 = {
    classes: {},
    resaga,
    senderId: 1,
    createAt: '2018-01-01',
  };

  beforeEach(() => {
    rendered = shallow(<ContentWrapper {...props} />);
    rendered2 = shallow(<ContentWrapper {...props2} />);
    instance = rendered.instance();
    instance2 = rendered2.instance();
  });
  it('renderDayHeader', () => {
    instance.isSameDay = jest.fn().mockReturnValueOnce(true);
    expect(toJSON(instance.renderDayHeader())).toMatchSnapshot();
  });
  it('content', () => {
    expect(toJSON(instance.content())).toMatchSnapshot();
  });
  it('render', () => {
    expect(toJSON(instance.render())).toMatchSnapshot();
  });
  it('isSameDay instance2', () => {
    expect(toJSON(instance2.isSameDay())).toMatchSnapshot();
  });
  it('content instance2', () => {
    expect(toJSON(instance2.isSameDay())).toMatchSnapshot();
  });
  it('markReadSuccess', () => {
    instance.markReadSuccess();
    expect(resaga.setValue).toHaveBeenCalledWith({ status: 'read' });
  });
  it('markReadAction', () => {
    const fakeMarkReadSuccess = jest.fn();
    instance.markReadSuccess = fakeMarkReadSuccess;
    instance.markReadAction({ preventDefault: jest.fn() });
    expect(resaga.dispatchTo).toHaveBeenCalledWith(
      NOTIFICATION_API,
      UPDATE_UGROOP_NOTIFICATION_STATUS,
      {
        payload: {
          id: 2,
          ugroopid: 2,
          data: {
            beforeId: 2,
            status: 'read',
          },
        },
        onSuccess: fakeMarkReadSuccess,
      },
    );
  });
  it('renderReadButton', () => {
    rendered.setProps({ status: null });
    instance = rendered.instance();
    const data = instance.renderReadButton({ preventDefault: jest.fn() });
    expect(toJSON(data)).toMatchSnapshot();
  });
  it('renderReadButton with unread status', () => {
    rendered.setProps({ status: 'read' });
    instance = rendered.instance();
    const data = instance.renderReadButton({ preventDefault: jest.fn() });
    expect(toJSON(data)).toMatchSnapshot();
  });
  it('renderReadButton with unread status', () => {
    rendered.setProps({ status: 'unread' });
    instance = rendered.instance();
    const data = instance.renderReadButton({ preventDefault: jest.fn() });
    expect(toJSON(data)).toMatchSnapshot();
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ simple: true, method: 'tourInvitation' });

      expect(instance.render()).toBe('');
    });

    it('should render', () => {
      rendered.setProps({ simple: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
