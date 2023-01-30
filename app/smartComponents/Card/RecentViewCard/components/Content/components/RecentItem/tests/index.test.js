import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { HIDE_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import { RecentItem } from '../index';

describe('<RecentItem />', () => {
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
    rendered = shallow(<RecentItem {...props} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('render', () => {
    const snapshot = shallow(<div>{instance.render()}</div>);
    expect(toJSON(snapshot)).toMatchSnapshot();
  });

  describe('instance()', () => {
    it('onLoading', () => {
      instance.onLoading(true)();
      expect(instance.state.loading).toBe(true);
    });

    it('onHideRecentActivity', () => {
      rendered.setProps({ id: 1 });
      const fn = jest.fn();
      instance.onLoading = jest.fn(() => fn);

      const payload = { nodeId: 1 };
      instance.onHideRecentActivity();

      expect(resaga.dispatchTo).toBeCalledWith(USER_API, HIDE_RECENT_ACTIVITY, {
        payload,
        onSuccess: fn,
      });
    });
  });
});
