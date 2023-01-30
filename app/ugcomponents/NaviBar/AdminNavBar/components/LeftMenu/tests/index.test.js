import { URL_HELPERS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LeftMenu, mapDispatchToProps } from '../index';
import { setRecentChannelDrawStatus } from '../../../../../../containers/StreamChat/actions';

describe('<LeftMenu />', () => {
  let rendered;
  let instance;
  const setActiveDraw = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history,
    match: { url: '/some_url' },
    userId: 2233,
    setActiveDraw,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<LeftMenu {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LeftMenu).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openMoreMenu()', () => {
    it('should setState anchorEl true', () => {
      instance.openMoreMenu();

      expect(rendered.state().anchorEl).toBe(true);
    });
  });

  describe('closeMoreMenu()', () => {
    it('should setState anchorEl false', () => {
      instance.closeMoreMenu();

      expect(rendered.state().anchorEl).toBe(false);
    });
  });

  describe('toggleDrawerKeepOpen()', () => {
    it('should call setValue', () => {
      instance.toggleDrawerKeepOpen();
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('toggleDrawerKeepOpen() chatdrawerKeepOpen', () => {
    it('should call setValue', () => {
      rendered.setProps({
        chatDrawerKeepOpen: true,
      });
      instance.toggleDrawerKeepOpen();
      expect(setActiveDraw).toBeCalledWith(false);
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('handleCloseMoreMenu()', () => {
    it('should call closeMoreMenu', () => {
      rendered.setProps({ drawerKeepOpen: false });
      instance.closeMoreMenu = jest.fn();

      instance.handleCloseMoreMenu();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.closeMoreMenu);
    });

    it('should NOT call closeMoreMenu', () => {
      rendered.setProps({ drawerKeepOpen: true });
      instance.closeMoreMenu = jest.fn();

      instance.handleCloseMoreMenu();

      TEST_HELPERS.expectNotCalled(instance.closeMoreMenu);
    });
  });

  describe('goTo()', () => {
    it('should goTo', () => {
      instance.goTo('/tours/123')();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });
  });

  describe('renderPersonal()', () => {
    it('should renderPersonal correctly', () => {
      const snapshot = shallow(<div>{instance.renderPersonal()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrganisation()', () => {
    it('should renderPersonal', () => {
      rendered.setProps({ organisations: [1, 2] });
      instance.renderPersonal = jest.fn(() => 'renderPersonal');

      expect(instance.renderOrganisation(3)).toBe('renderPersonal');
    });

    it('should renderOrganisation', () => {
      rendered.setProps({ organisations: [1, 2] });

      const snapshot = shallow(<div>{instance.renderOrganisation(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTourNode()', () => {
    it('should renderTourNode', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourNode(1122), [
        { content: 'content' },
      ]);
    });
  });

  describe('renderTour()', () => {
    it('should renderTour()', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTour, [{ id: 1 }]);
    });
  });

  describe('renderHome()', () => {
    it('should renderHome', () => {
      rendered.setProps({ userId: 2233 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHome);
    });
  });

  describe('renderTours()', () => {
    it('should return loading', () => {
      rendered.setProps({ ids: [] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });

    it('should renderTours', () => {
      rendered.setProps({ ids: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });
  });

  describe('renderCurrentOrganisation()', () => {
    it('isTourPage = true, organisationIdFromNode > 0', () => {
      URL_HELPERS.isTourPage = jest.fn(() => true);

      rendered.setProps({ organisationIdFromNode: 3344 });
      instance.renderOrganisation = jest.fn(() => 'renderOrganisation');

      expect(instance.renderCurrentOrganisation()).toBe('renderOrganisation');
      expect(instance.renderOrganisation).toBeCalled();
      expect(instance.renderOrganisation.mock.calls).toMatchSnapshot();
    });

    it('isTourPage = true, organisationIdFromNode === -1', () => {
      URL_HELPERS.isTourPage = jest.fn(() => true);

      rendered.setProps({ organisationIdFromNode: -1 });
      instance.renderPersonal = jest.fn(() => 'renderPersonal');

      expect(instance.renderCurrentOrganisation()).toBe('renderPersonal');
      expect(instance.renderPersonal).toBeCalled();
      expect(instance.renderPersonal.mock.calls).toMatchSnapshot();
    });
    it('isTourPage = false, isPersonalPage = true', () => {
      URL_HELPERS.isTourPage = jest.fn(() => false);
      URL_HELPERS.isPersonalPage = jest.fn(() => true);

      instance.renderPersonal = jest.fn(() => 'renderPersonal');

      expect(instance.renderCurrentOrganisation()).toBe('renderPersonal');
      expect(instance.renderPersonal).toBeCalled();
      expect(instance.renderPersonal.mock.calls).toMatchSnapshot();
    });

    it('isTourPage = false, isPersonalPage = false, isOrganisationPage = true', () => {
      URL_HELPERS.isTourPage = jest.fn(() => false);
      URL_HELPERS.isPersonalPage = jest.fn(() => false);
      URL_HELPERS.isOrganisationPage = jest.fn(() => true);

      rendered.setProps({ organisationIdFromURL: 2345 });
      instance.renderOrganisation = jest.fn(() => 'renderOrganisation');

      expect(instance.renderCurrentOrganisation()).toBe('renderOrganisation');
      expect(instance.renderOrganisation).toBeCalled();
      expect(instance.renderOrganisation.mock.calls).toMatchSnapshot();
    });

    it('isTourPage = false, isPersonalPage = false, isOrganisationPage = false', () => {
      URL_HELPERS.isTourPage = jest.fn(() => false);
      URL_HELPERS.isPersonalPage = jest.fn(() => false);
      URL_HELPERS.isOrganisationPage = jest.fn(() => false);

      expect(instance.renderCurrentOrganisation()).toBe(null);
    });
  });

  describe('renderCurrentOrganisationContainer()', () => {
    it('should return null', () => {
      URL_HELPERS.isDashboardPage = jest.fn(() => true);

      expect(instance.renderCurrentOrganisationContainer()).toBe(null);
    });

    it('should renderCurrentOrganisationContainer', () => {
      URL_HELPERS.isDashboardPage = jest.fn(() => false);
      instance.renderCurrentOrganisation = jest.fn(
        () => 'renderCurrentOrganisation',
      );

      expect(instance.renderCurrentOrganisationContainer()).toBe(
        'renderCurrentOrganisation',
      );
    });
  });

  describe('renderNewTourButton()', () => {
    it('should renderNewTourButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewTourButton, [{}]);
    });
  });

  describe('renderNavigationDrawer()', () => {
    it('should return null', () => {
      rendered.setProps({ drawerKeepOpen: null });
      rendered.setState({ anchorEl: null });

      expect(instance.renderNavigationDrawer()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ match: { url: '/admin' } });
      instance.renderSelectOrganisation = jest.fn(
        () => 'renderSelectOrganisation',
      );

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const { setActiveDraw } = mapDispatchToProps(dispatch);
  setActiveDraw('admin');
  expect(dispatch).toBeCalledWith(setRecentChannelDrawStatus('admin'));
});
