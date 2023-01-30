import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Header } from '../index';
import {
  NOTIFICATION_API,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from '../../../../../../apis/constants';

describe('<Header />', () => {
  let rendered;
  let rendered2;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    ugroopIds: [1, 2],
    userId: 2,
  };

  const props2 = {
    classes: {},
    resaga,
    ugroopIds: [],
    userId: 2,
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    rendered2 = shallow(<Header {...props2} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should match snapshot if smDown', () => {
      const instance = rendered.instance();
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  it('to match with Snapshot', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('handle close click', () => {
    expect(toJSON(rendered.instance().handleCloseClick())).toMatchSnapshot();
  });
  it('renderMarkAllButton', () => {
    expect(toJSON(rendered.instance().renderMarkAllButton())).toMatchSnapshot();
  });
  it('markAllReadSuccess', () => {
    const instance = rendered.instance();
    instance.markAllReadSuccess();
    expect(resaga.setValue).toHaveBeenCalled();
  });
  it('ugroopStatusFn', () => {
    const instance = rendered.instance();
    const res = instance.ugroopStatusFn({ name: 'a', address: 'b' });
    expect(res).toEqual({
      address: {
        0: 'b',
        status: 'read',
      },
      name: {
        0: 'a',
        status: 'read',
      },
    });
  });
  it('markAllReadAction', () => {
    const fakeMarkAllReadSuccess = jest.fn();
    const instance = rendered.instance();
    instance.markAllReadSuccess = fakeMarkAllReadSuccess;
    instance.markAllReadAction({ preventDefault: jest.fn() });
    expect(resaga.dispatchTo).toHaveBeenCalledWith(
      NOTIFICATION_API,
      UPDATE_UGROOP_NOTIFICATION_STATUS,
      {
        payload: {
          id: 2,
          ugroopid: 1,
          data: {
            beforeId: 2,
            status: 'read',
          },
        },
        onSuccess: fakeMarkAllReadSuccess,
      },
    );
  });
  it('markAllReadAction do nothing', () => {
    const instance = rendered2.instance();
    instance.markAllReadAction({ preventDefault: jest.fn() });
    expect(resaga.dispatchTo).not.toHaveBeenCalled();
  });
  it('renderMarkAllButton without ugroopid ', () => {
    const instance = rendered2.instance();
    const res = instance.renderMarkAllButton();
    expect(toJSON(res)).toMatchSnapshot();
  });
});
