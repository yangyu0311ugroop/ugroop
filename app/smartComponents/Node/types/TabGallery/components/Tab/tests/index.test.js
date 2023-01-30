import { ability } from 'apis/components/Ability/ability';
import {
  LIST_VIEW,
  CARD_VIEW,
  CREATED_AT,
  CREATED_BY,
  DO_NOTHING,
  LEAST_RECENTLY_UPLOADED,
  MOST_LIKED,
  NONE,
  PREVIEW,
  SELECT,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { scroller } from 'react-scroll';
import { Tab } from '../index';

describe('<Tab />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 898,
    templateId: 999,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Tab {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Tab).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      instance.fetchTab = jest.fn(() => '');

      instance.componentDidMount();

      TEST_HELPERS.expectCalled(instance.fetchTab);
    });
  });

  describe('fetchTab()', () => {
    it('should fetchTab()', () => {
      instance.fetchTab();
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });
    it('should not be called dispatchTo on public', () => {
      rendered.setProps({ isPublic: true });
      TEST_HELPERS.expectMatchSnapshot(instance.fetchTab());
    });
  });

  describe('selectAll()', () => {
    it('should selectAll()', () => {
      rendered.setProps({ children: [1, 2, 3] });
      rendered.setState({ showingIds: [2, 3, 4] });

      instance.selectAll();

      expect(rendered.state().selectedIds).toEqual([2, 3]);
    });
  });

  describe('deselectAll()', () => {
    it('should deselectAll()', () => {
      rendered.setState({ selectedIds: [1, 2, 3] });

      instance.deselectAll();

      expect(rendered.state().selectedIds).toEqual([]);
    });
  });

  describe('getPages()', () => {
    it('should return 0', () => {
      expect(instance.getPages()).toEqual(0);
    });
    it('should page 1', () => {
      rendered.setProps({ children: [1, 2, 3] });
      rendered.setState({ itemsPerPage: 12 });
      expect(instance.getPages()).toEqual(1);
      // expect(rendered.state().selectedIds).toEqual([]);
    });
  });

  describe('onChangePage()', () => {
    it('should return 0', () => {
      instance.scrollToTop = jest.fn();
      instance.onChangePage('', 1);
      expect(rendered.state().page).toEqual(0);
      expect(instance.scrollToTop).toBeCalled();
    });
  });

  describe('toggleMode()', () => {
    it('should toggleMode()', () => {
      rendered.setState({ clickMode: SELECT });

      instance.toggleMode();

      expect(rendered.state().clickMode).toEqual(PREVIEW);
      expect(rendered.state().selectedIds).toEqual([]);
    });
  });

  describe('handleClickPhoto()', () => {
    it('should handleClickPhoto() arrayRemove', () => {
      rendered.setState({ clickMode: SELECT, selectedIds: [1, 2] });

      instance.handleClickPhoto(1)();

      expect(rendered.state().selectedIds).toEqual([2]);
    });

    it('should handleClickPhoto() arrayAdd', () => {
      rendered.setState({ clickMode: SELECT, selectedIds: [1, 2] });

      instance.handleClickPhoto(3)();

      expect(rendered.state().selectedIds).toEqual([1, 2, 3]);
    });

    it('should handleClickPhoto() PREVIEW', () => {
      rendered.setState({ clickMode: PREVIEW, selectedIds: [1, 2] });

      instance.handleClickPhoto(3)();

      expect(rendered.state().selectedIds).toEqual([1, 2]);
    });
  });

  describe('batchDelete()', () => {
    it('should call dispatchTo', () => {
      instance.batchDelete([1])();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });

    it('should DO_NOTHING', () => {
      expect(instance.batchDelete([])()).toBe(DO_NOTHING);
    });
  });

  describe('renderPageItem()', () => {
    it('should renderPageItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPageItem, [{}]);
    });
  });
  describe('scrollToTop()', () => {
    it('should scrollToTop()', () => {
      scroller.scrollTo = jest.fn(() => '');

      instance.scrollToTop();

      TEST_HELPERS.expectCalled(scroller.scrollTo);
    });
  });

  describe('confirmDelete()', () => {
    it('should call PORTAL_HELPERS.confirmDeletePhoto', () => {
      PORTAL_HELPERS.confirmDeletePhoto = jest.fn();

      instance.confirmDelete({});

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        PORTAL_HELPERS.confirmDeletePhoto,
      );
    });
  });

  describe('handleBatchDelete()', () => {
    it('should call confirmDelete', () => {
      instance.confirmDelete = jest.fn();
      instance.batchDelete = jest.fn();

      instance.handleBatchDelete();

      TEST_HELPERS.expectCalled(instance.confirmDelete);
    });
  });

  describe('handleDelete()', () => {
    it('should call confirmDelete', () => {
      instance.confirmDelete = jest.fn();

      instance.handleDelete()();

      TEST_HELPERS.expectCalled(instance.confirmDelete);
    });
  });

  describe('batchDeleteDone()', () => {
    it('should call closePortal', () => {
      PORTAL_HELPERS.closePortal = jest.fn();

      instance.batchDeleteDone();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
    });
  });

  describe('openPreview()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: true });
      rendered.setState({ clickMode: SELECT });

      expect(instance.openPreview()()).toBe(null);
    });

    it('should openPreview', () => {
      rendered.setProps({ editable: false });
      rendered.setState({ clickMode: PREVIEW });
      PORTAL_HELPERS.openPhotoPreview = jest.fn();

      instance.openPreview(112)();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openPhotoPreview);
    });
  });

  describe('changeSortBy()', () => {
    it('should changeSortBy()', () => {
      instance.changeSortBy(111)();

      expect(rendered.state().sortBy).toEqual(111);
    });
  });

  describe('changeGroupBy()', () => {
    it('should changeGroupBy()', () => {
      instance.changeGroupBy(111)();

      expect(rendered.state().groupBy).toEqual(111);
    });
  });

  describe('changeLayout()', () => {
    it('should changeLayout()', () => {
      instance.changeLayout(111)();

      expect(rendered.state().layout).toEqual(111);
    });
  });

  describe('renderPhotoDetail()', () => {
    it('should renderPhotoDetail', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoDetail);
    });
  });

  describe('renderDescription()', () => {
    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        { content: 'content' },
      ]);
    });
  });

  describe('renderPhotoComponent()', () => {
    it('should remove from showingIds', () => {
      rendered.setProps({ editable: true });
      rendered.setState({ showingIds: [1, 2] });

      instance.renderPhotoComponent(1)({ canUpdate: false });

      expect(rendered.state().showingIds).toEqual([2]);
    });

    it('should add to showingIds', () => {
      rendered.setProps({ editable: false });
      rendered.setState({ showingIds: [2] });

      expect(
        instance.renderPhotoComponent(1)({
          canUpdate: true,
          content: 'content',
        }),
      ).toMatchSnapshot();

      expect(rendered.state().showingIds).toEqual([2, 1]);
    });
  });

  describe('renderPhoto()', () => {
    it('should renderPhoto', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoto);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderSortButton()', () => {
    it('should renderSortButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSortButton, [{}]);
    });
  });

  describe('renderSortMenu()', () => {
    it('should renderSortMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSortMenu, [{}]);
    });
  });

  describe('renderGroupButton()', () => {
    it('should renderGroupButton', () => {
      rendered.setState({ groupBy: CREATED_AT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupButton, [{}]);
    });

    it('should renderGroupButton NONE', () => {
      rendered.setState({ groupBy: NONE });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupButton, [{}]);
    });
  });

  describe('renderGroupMenu()', () => {
    it('should renderGroupMenu', () => {
      rendered.setState({ groupBy: CREATED_AT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupMenu, [{}]);
    });

    it('should renderGroupMenu', () => {
      rendered.setState({ groupBy: NONE });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupMenu, [{}]);
    });
  });

  describe('renderLayoutButton()', () => {
    it('should renderLayoutButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutButton, [{}]);
    });
  });

  describe('renderLayoutMenu()', () => {
    it('should renderLayoutMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutMenu, [{}]);
    });
  });

  describe('renderGroupHeader()', () => {
    it('should return null', () => {
      rendered.setState({ groupBy: NONE });

      expect(instance.renderGroupHeader()).toBe(null);
    });

    it('should renderGroupHeader CREATED_BY', () => {
      rendered.setState({ groupBy: CREATED_BY });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupHeader);
    });

    it('should renderGroupHeader CREATED_AT', () => {
      rendered.setState({ groupBy: CREATED_AT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroupHeader);
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      ability.can = jest.fn(() => true);
      instance.renderMenus = jest.fn(() => 'renderMenus');

      instance.canCreatePhoto = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
    it('should renderHeader if xsDown is true', () => {
      rendered.setProps({ xsDown: true });
      ability.can = jest.fn(() => true);
      instance.renderMenus = jest.fn(() => 'renderMenus');
      instance.renderTitle = jest.fn(() => 'renderTitle');

      instance.canCreatePhoto = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('renderMenus', () => {
    it('should render if xsDown', () => {
      rendered.setProps({ xsDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenus);
    });
  });

  describe('renderGroup()', () => {
    it('should renderGroup', () => {
      instance.renderGroupHeader = jest.fn(() => 'renderGroupHeader');
      instance.renderPhotos = jest.fn(() => 'renderPhotos');

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroup, [1, 1, []]);
    });
  });

  describe('renderGroups()', () => {
    it('should renderGroups', () => {
      instance.renderGroup = jest.fn(() => 'renderGroup');

      TEST_HELPERS.expectMatchSnapshot(instance.renderGroups, [
        {
          groupIds: [1],
          groupData: { 1: '1' },
        },
      ]);
    });
  });

  describe('renderSortLikes', () => {
    it('should return renderPhoto array', () => {
      instance.renderPhoto = jest.fn(() => <div>Render Photo</div>);

      const result = instance.renderSortLikes({ sortedChildren: [1, 2] });

      expect(result).toMatchSnapshot();
    });
  });

  describe('renderPhotos()', () => {
    it('should return null', () => {
      instance.children = jest.fn(() => []);

      expect(instance.renderPhotos()).toBe(null);
    });

    it('should renderPhotos', () => {
      instance.children = jest.fn(() => [1]);
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotos);
    });

    it('should render photos with sorter when sortBy is most liked', () => {
      rendered.setState({ sortBy: MOST_LIKED });
      instance.children = jest.fn(() => [1, 2, 3]);

      const snapshot = shallow(<div>{instance.renderPhotos()}</div>);
      expect(snapshot).toMatchSnapshot();
    });

    it('should renderPhotos LIST_VIEW', () => {
      rendered.setState({ layout: LIST_VIEW });

      instance.children = jest.fn(() => [1]);
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotos);
    });

    it('should renderPhotos CARD_VIEW', () => {
      rendered.setState({ layout: CARD_VIEW });

      instance.children = jest.fn(() => [1]);
      instance.renderPhoto = jest.fn(() => 'renderPhoto');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotos);
    });
  });

  describe('renderContent()', () => {
    it('should return null', () => {
      rendered.setState({ groupBy: NONE });
      instance.renderPhotos = jest.fn(() => 'renderPhotos');

      expect(instance.renderContent()).toBe('renderPhotos');
    });

    it('should renderContent', () => {
      rendered.setState({ groupBy: CREATED_AT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('children()', () => {
    it('should return children', () => {
      rendered.setProps({ children: [1] });

      expect(instance.children()).toEqual([1]);
    });

    it('should children', () => {
      rendered.setProps({ children: [1, 2] });
      rendered.setState({ sortBy: LEAST_RECENTLY_UPLOADED });

      expect(instance.children()).toEqual([1, 2]);
    });

    it('should children', () => {
      rendered.setProps({ children: [1, 2] });

      expect(instance.children()).toEqual([2, 1]);
    });
  });

  describe('renderSelectDeselect()', () => {
    it('should return null', () => {
      rendered.setState({ clickMode: PREVIEW });

      expect(instance.renderSelectDeselect()).toBe(null);
    });

    it('should render Select All', () => {
      rendered.setState({
        clickMode: SELECT,
        showingIds: [1],
        selectedIds: [1],
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectDeselect);
    });

    it('should render Deselect All', () => {
      rendered.setState({
        clickMode: SELECT,
        showingIds: [1, 2],
        selectedIds: [1],
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelectDeselect);
    });
  });

  describe('renderSelect()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: false });

      expect(instance.renderSelect()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ editable: true });
      rendered.setState({ showingIds: [] });

      expect(instance.renderSelect()).toBe(null);
    });

    it('should renderSelect', () => {
      rendered.setProps({ editable: true });
      rendered.setState({ showingIds: [1], clickMode: SELECT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });

    it('should renderSelect clickMode SELECT', () => {
      rendered.setProps({ editable: true, children: [1, 2] });
      rendered.setState({ clickMode: SELECT });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });

    it('should renderSelect deselectAll', () => {
      rendered.setProps({
        editable: true,
        children: [1, 2],
        batchDeleting: true,
      });
      rendered.setState({ clickMode: SELECT, selectedIds: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSelect);
    });
  });

  describe('render()', () => {
    it('should renderEmpty', () => {
      rendered.setProps({ children: [] });
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      expect(instance.render()).toBe('renderEmpty');
    });

    it('should render correctly', () => {
      rendered.setProps({ children: [1] });
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderSelect = jest.fn(() => 'renderSelect');
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
