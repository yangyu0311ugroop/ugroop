import { GET_PERSON_DETAIL, PERSON_DETAIL_API } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { UGAdminHeader } from '../index';

describe('<UGAdminHeader />', () => {
  const mockResaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const emptyMenuData = { menuList: [] };
  const styleSheet = {
    topLeftMenubar: {
      display: 'flex',
    },
    topRightMenubar: {
      'margin-top': '5px',
      '& > ul': {
        display: 'flex',
        'align-content': 'center',
        '& > li': {
          margin: 'auto',
        },
      },
    },
  };

  describe('<UGAdminHeader />', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(
        <UGAdminHeader
          resaga={mockResaga}
          menuData={emptyMenuData}
          classes={styleSheet}
          location={{ pathname: 'name' }}
        />,
      );
      instance = wrapper.instance();
    });
    afterEach(() => jest.clearAllMocks());

    describe('componentWillUnmount()', () => {
      it('should setInterval', () => {
        global.clearInterval = jest.fn();

        instance.componentWillUnmount();

        expect(global.clearInterval).toBeCalled();
      });
    });

    describe('checkForUpdate()', () => {
      it('should checkForUpdate()', () => {
        global.window.swUpdate = true;

        instance.checkForUpdate();

        expect(wrapper.state().showUpdate).toBe(true);
      });

      it('should NOT checkForUpdate()', () => {
        global.window.swUpdate = false;

        instance.checkForUpdate();

        expect(wrapper.state().showUpdate).not.toBe(true);
      });
    });

    describe('refreshPage()', () => {
      it('should refreshPage()', () => {
        instance.refreshPage();
      });
    });

    describe('renderShowUpdate()', () => {
      it('should renderShowUpdate', () => {
        TEST_HELPERS.expectMatchSnapshot(instance.renderShowUpdate);
      });
    });

    describe('renderLeftMenu()', () => {
      it('should return null', () => {
        wrapper.setProps({ showLeftMenu: false });

        expect(instance.renderLeftMenu()).toBe(null);
      });

      it('should renderLeftMenu correctly', () => {
        wrapper.setProps({ showLeftMenu: true });
        instance.renderOrganisation = jest.fn(
          id => `instance.renderOrganisation${id}`,
        );

        const snapshot = shallow(<div>{instance.renderLeftMenu(3344)}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });

    it('fetchPersonDetails() to call dispatch', () => {
      wrapper.instance().fetchPersonDetails('email');
      expect(mockResaga.dispatchTo).toBeCalledWith(
        PERSON_DETAIL_API,
        GET_PERSON_DETAIL,
        {
          payload: {
            userId: 'email',
          },
        },
      );
    });
    it('fetchPersonDetails() to not call dispatch', () => {
      wrapper.instance().fetchPersonDetails();
      expect(mockResaga.dispatch).not.toBeCalled();
    });

    describe('renderLogo()', () => {
      it('should renderLogo', () => {
        wrapper.setProps({ drawerKeepOpen: true });

        TEST_HELPERS.expectMatchSnapshot(instance.renderLogo);
      });
    });

    describe('render()', () => {
      it('should render', () => {
        wrapper.setState({ showUpdate: true });

        TEST_HELPERS.expectMatchSnapshot(instance.render);
      });
    });
  });
});
