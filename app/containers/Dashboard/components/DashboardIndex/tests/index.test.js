import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DashboardIndex } from '../index';

describe('<DashboardIndex />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    fullName: 'Ping Pong',
    classes: {},
    history: { push: jest.fn() },
    me: 'ping@pong.com',
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<DashboardIndex {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(DashboardIndex).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleIgnore()', () => {
    it('should handleIgnore()', () => {
      instance.onCloseShareToDialog = jest.fn();
      instance.goToIndex = jest.fn();

      instance.handleIgnore();

      TEST_HELPERS.expectCalled(instance.onCloseShareToDialog);
      TEST_HELPERS.expectCalled(instance.goToIndex);
    });
  });

  describe('fetchData()', () => {
    it('should not setState', () => {
      instance.fetchData();
      expect(instance.state.shareToDialog).toBe(false);
    });
    it('should setState', () => {
      rendered.setProps({ location: { search: '?shareTo=test&token=token' } });
      instance.fetchData();
      expect(instance.state.shareToDialog).toBe(true);
      expect(instance.state.shareTo).toBe('test');
      expect(instance.state.token).toBe('token');
    });
  });

  describe('onSwitchAccount()', () => {
    it('should setState', () => {
      rendered.setState({ token: 'token', shareToDialog: true });
      instance.onSwitchAccount();
      expect(instance.state.shareToDialog).toBe(false);
      expect(resaga.setValue).toBeCalledWith({ token: 'token' });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
