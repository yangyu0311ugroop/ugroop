import { RECENT, STARRED, URL_HELPERS, FEATURED } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Card, hideOrganisations } from '../index';

describe('<Card />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
    history,
    resaga,
    featuredTours: {},
    starredFeatured: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Card {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Card).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderOrganisationButtonsView', () => {
    it('should match snapshot if isDrawer', () => {
      rendered.setProps({ isDrawer: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisationButtonsView);
    });
  });

  describe('renderPersonalButtonView', () => {
    it('should match snapshot if isDrawer', () => {
      rendered.setProps({ isDrawer: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonalButtonView);
    });
  });

  describe('goToMyTours()', () => {
    it('should goToMyTours()', () => {
      instance.goToMyTours(2233);

      expect(history.push).toBeCalledWith(URL_HELPERS.myTours(2233));
    });
  });

  describe('hideOrganisations()', () => {
    it('should hideOrganisations() concat', () => {
      expect(hideOrganisations(2233)()).toEqual([2233]);
    });

    it('should hideOrganisations() delete', () => {
      expect(hideOrganisations(2233)([1, 2233])).toEqual([1]);
    });
  });

  describe('toggleCollapsible()', () => {
    it('should toggleCollapsible()', () => {
      instance.toggleCollapsible();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('showAllTour()', () => {
    it('should setValue', () => {
      rendered.setProps({ minimise: true });

      instance.showAllTour();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should setValue if minimise and toggleId = FEATURED', () => {
      rendered.setProps({
        minimise: true,
        toggleId: FEATURED,
      });

      instance.showAllTour();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should setValue if toggleId = FEATURED', () => {
      rendered.setProps({
        minimise: false,
        toggleId: FEATURED,
      });

      instance.showAllTour();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should goToMyTours', () => {
      rendered.setProps({ minimise: false, toggleId: 2332 });
      instance.goToMyTours = jest.fn();

      instance.showAllTour();

      TEST_HELPERS.expectMatchSnapshot(instance.goToMyTours);
    });
  });

  describe('collapsed()', () => {
    it('should collapsed() search', () => {
      rendered.setProps({ search: true });

      expect(instance.collapsed()).toBe(false);
    });

    it('should collapsed() minimise', () => {
      rendered.setProps({ minimise: false });

      expect(instance.collapsed()).toBe(false);
    });

    it('should collapsed() collapsed', () => {
      rendered.setProps({ minimise: true, collapsed: true });

      expect(instance.collapsed()).toBe(true);
    });
  });

  describe('renderTour()', () => {
    it('should return null', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children, toggleId: STARRED, starredFeatured: [] });

      expect(instance.renderTour()).toBe('children');
    });

    it('should renderTour', () => {
      rendered.setProps({ minimise: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTour);
    });
  });

  describe('renderShowAll()', () => {
    it('should return null', () => {
      rendered.setProps({
        id: 2233,
        active: false,
        search: false,
        items: [1, 2],
        maxRender: 4,
      });
      instance.collapsed = jest.fn(() => false);

      expect(instance.renderShowAll()).toBe(null);
    });

    it('should renderTour minimise', () => {
      rendered.setProps({
        minimise: true,
        id: 2233,
        active: false,
        search: false,
        items: [1, 2],
        maxRender: 1,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTour);
    });

    it('should renderTour', () => {
      rendered.setProps({
        minimise: false,
        id: 2233,
        active: false,
        search: false,
        items: [1, 2],
        maxRender: 1,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTour);
    });
  });

  describe('renderFeaturedHeader', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFeaturedHeader);
    });
  });

  describe('renderTours()', () => {
    it('should return null', () => {
      rendered.setProps({ items: [] });

      expect(instance.renderTours()).toBe(null);
    });

    it('should render without starred', () => {
      rendered.setProps({
        starredTours: [1],
        featuredTours: {
          1: { content: '1' },
          2: { content: '1' },
        },
        items: [3, 4],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });

    it('should render starredFeatured', () => {
      rendered.setProps({
        toggleId: FEATURED,
        featuredTours: {
          1709: { content: '1' },
          1710: { content: '2' },
        },
        active: true,
        hasStarredFeatured: true,
      });
      instance.renderTour = jest.fn(() => 'renderTour');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });

    it('should render featured tours', () => {
      rendered.setProps({
        toggleId: FEATURED,
        featuredTours: {
          1709: { content: '1' },
          1710: { content: '2' },
        },
      });
      instance.renderTour = jest.fn(() => 'renderTour');
      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });

    it('should renderTours active', () => {
      rendered.setProps({ items: [1, 2], active: true });
      instance.renderTour = jest.fn(() => 'renderTour');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });

    it('should renderTours maxRender', () => {
      rendered.setProps({ items: [1, 2], maxRender: 1 });
      instance.renderTour = jest.fn(() => 'renderTour');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTours);
    });
  });

  describe('renderNewTourButton()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0 });

      expect(instance.renderNewTourButton({})).toBe(null);
    });

    it('should renderNewTourButton', () => {
      rendered.setProps({ id: 2233 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNewTourButton, [{}]);
    });

    it('should renderNewTourButton', () => {
      rendered.setProps({ id: 2233, personal: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNewTourButton, [{}]);
    });
  });

  describe('renderNewTour()', () => {
    it('should renderNewTour', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewTour);
    });
  });

  describe('renderCollapseButton()', () => {
    it('should return null', () => {
      rendered.setProps({ minimise: false });
      instance.collapsed = jest.fn(() => false);

      expect(instance.renderCollapseButton()).toBe(null);
    });

    it('should renderCollapseButton', () => {
      rendered.setProps({ minimise: false });
      instance.collapsed = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCollapseButton);
    });
  });

  describe('renderStarredHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ items: [], starredFeatured: [] });

      expect(instance.renderStarredHeader()).toBe(null);
    });

    it('should match snapshot if personal', () => {
      rendered.setProps({
        starredFeatured: [],
        location: { pathname: '/my-tours/personal' },
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredHeader);
    });

    it('should renderStarredHeader', () => {
      rendered.setProps({ items: [1], location: { pathname: 'bleng' } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredHeader);
    });
    it('should renderStarredHeader', () => {
      rendered.setProps({
        items: [1],
        location: { pathname: URL_HELPERS.myTours(-1) },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredHeader);
    });
    it('should render Starred Featured Tours', () => {
      rendered.setProps({
        items: [1],
        location: { pathname: URL_HELPERS.myTours(-1) },
        hasStarredFeatured: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredHeader);
    });
  });

  describe('renderRecentHeader()', () => {
    it('should renderRecentHeader', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRecentHeader);
    });
  });

  describe('renderPersonalHeader()', () => {
    it('should renderPersonalHeader', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonalHeader);
    });
  });

  describe('renderPersonalButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ minimise: true });

      expect(instance.renderPersonalButtons()).toBe(null);
    });

    it('should renderPersonalButtons', () => {
      rendered.setProps({ minimise: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonalButtons);
    });
  });

  describe('renderOrganisationHeader()', () => {
    it('should renderOrganisationHeader', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisationHeader);
    });
  });

  describe('renderOrganisationButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ minimise: true });

      expect(instance.renderOrganisationButtons()).toBe(null);
    });

    it('should renderOrganisationButtons', () => {
      rendered.setProps({ minimise: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisationButtons);
    });
  });

  describe('onOpenPopover()', () => {
    it('should set state', () => {
      instance.onOpenPopover({ currentTarget: true });
      expect(rendered.state().anchorEl).toBe(true);
    });
  });
  describe('onClose()', () => {
    it('should set state', () => {
      instance.onClose();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('renderUpdatedAt()', () => {
    it('should return null 1', () => {
      rendered.setProps({ updatedAt: 0 });

      expect(instance.renderUpdatedAt()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ updatedAt: 1, minimise: true });

      expect(instance.renderUpdatedAt()).toBe(null);
    });

    it('should return null 3', () => {
      rendered.setProps({
        updatedAt: 1,
        minimise: false,
        toggleId: 'toggleId',
      });

      expect(instance.renderUpdatedAt()).toBe(false);
    });

    it('should renderUpdatedAt', () => {
      rendered.setProps({ updatedAt: 1, minimise: false, toggleId: 3 });
      MOMENT_HELPERS.renderDayDate = jest.fn(() => 'renderDayDate');
      MOMENT_HELPERS.renderTime = jest.fn(() => 'renderTime');
      MOMENT_HELPERS.timeSinceAtLeast = jest.fn(() => 'timeSinceAtLeast');

      TEST_HELPERS.expectMatchSnapshot(instance.renderUpdatedAt);
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader prop', () => {
      const renderHeader = jest.fn(() => 'renderHeader');
      rendered.setProps({ renderHeader });
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = STARRED', () => {
      rendered.setProps({ toggleId: STARRED, active: true });
      instance.renderStarredHeader = jest.fn(() => 'renderStarredHeader');
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = STARRED and selectedFeaturedMinimise', () => {
      rendered.setProps({
        toggleId: STARRED,
        active: true,
        selectedFeaturedMinimise: true,
      });
      instance.renderStarredHeader = jest.fn(() => 'renderStarredHeader');
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = FEATURED', () => {
      rendered.setProps({
        toggleId: FEATURED,
        active: true,
        featuredTours: {
          1: { content: '1' },
          2: { content: '1' },
        },
        items: [3, 4],
      });
      instance.renderFeaturedHeader = jest.fn(() => 'renderFeaturedHeader');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = -1 and selectedFeaturedMinimise', () => {
      rendered.setProps({
        toggleId: -1,
        active: true,
        selectedFeaturedMinimise: true,
        featuredTours: {
          1: { content: '1' },
          2: { content: '1' },
        },
        items: [3, 4],
      });
      instance.renderFeaturedHeader = jest.fn(() => 'renderFeaturedHeader');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = FEATURED and return null', () => {
      rendered.setProps({
        toggleId: FEATURED,
        active: true,
        featuredTours: {},
      });
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = RECENT', () => {
      rendered.setProps({ toggleId: RECENT, active: true });
      instance.renderRecentHeader = jest.fn(() => 'renderRecentHeader');
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = -1', () => {
      rendered.setProps({ toggleId: -1, active: true, items: [1] });
      instance.renderPersonalHeader = jest.fn(() => 'renderPersonalHeader');
      instance.renderPersonalButtons = jest.fn(() => 'renderPersonalButtons');
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId = -1 and items.length is zero', () => {
      rendered.setProps({ toggleId: -1, active: true, items: [] });
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should toggleId > 0', () => {
      rendered.setProps({ toggleId: 2233, active: true });
      instance.renderOrganisationHeader = jest.fn(
        () => 'renderOrganisationHeader',
      );
      instance.renderOrganisationButtons = jest.fn(
        () => 'renderOrganisationButtons',
      );
      instance.renderCollapseButton = jest.fn(() => 'renderCollapseButton');
      instance.renderUpdatedAt = jest.fn(() => 'renderUpdatedAt');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('organisation has Setting Access()', () => {
    it('should return null', () => {
      instance.hasOrgSettingAccess = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderMorePopper(true)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderOrganisationButtons', () => {
      instance.hasOrgSettingAccess = jest.fn(() => true);
      const snapshot = shallow(
        <div>{instance.renderOrganisationButtons()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        minimise: false,
        featuredTours: {
          1709: { content: '1' },
        },
      });
      instance.collapsed = jest.fn(() => false);

      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderTours = jest.fn(() => 'renderTours');
      instance.renderNewTour = jest.fn(() => 'renderNewTour');
      instance.renderShowAll = jest.fn(() => 'renderShowAll');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if there are no featuredTours', () => {
      rendered.setProps({ minimise: false, featuredTours: null });
      instance.collapsed = jest.fn(() => false);

      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderTours = jest.fn(() => 'renderTours');
      instance.renderNewTour = jest.fn(() => 'renderNewTour');
      instance.renderShowAll = jest.fn(() => 'renderShowAll');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
