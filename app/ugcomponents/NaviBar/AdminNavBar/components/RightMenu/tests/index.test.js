import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { mapDispatchToProps, RightMenu } from '../index';
import { setRecentChannelDrawStatus } from '../../../../../../containers/StreamChat/actions';

describe('<RightMenu />', () => {
  let rendered;
  let instance;
  const isReviewDrawerActive = jest.fn();
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    isReviewDrawerActive,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<RightMenu {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RightMenu).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleReviewDrawer()', () => {
    it('should toggleReviewDrawer()', () => {
      instance.toggleReviewDrawer();
      expect(isReviewDrawerActive).toBeCalled();
    });
    it('should toggleReviewDrawer() not call setActive', () => {
      rendered.setProps({
        isChatDrawerOpen: true,
      });
      instance.toggleReviewDrawer();
      expect(isReviewDrawerActive).not.toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const { isReviewDrawerActive } = mapDispatchToProps(dispatch);
  isReviewDrawerActive('admin');
  expect(dispatch).toBeCalledWith(setRecentChannelDrawStatus('admin'));
});
