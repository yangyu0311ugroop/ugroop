import { DO_NOTHING, FEATURED, RECENT, STARRED } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Tours } from '../index';

describe('<Tours />', () => {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = shallow(<Tours {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Tours).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      rendered.setProps({ minimise: true });
      rendered.setState({ loadedOnce: true });
      instance.fetchToursHandler = jest.fn();

      instance.componentDidMount();

      TEST_HELPERS.expectNotCalled(instance.fetchToursHandler);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('handleDelayed()', () => {
    it('should handleDelayed()', () => {
      instance.handleDelayed();

      expect(rendered.state().delayed).toBe(true);
    });
  });

  describe('fetchToursHandler()', () => {
    it('should call resaga.dispatchTo', () => {
      rendered.setProps({ getRecentActivity: false });

      instance.fetchToursHandler();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });

    it('should fetchToursHandler', () => {
      rendered.setProps({ getRecentActivity: true });
      instance.fetchRecentActivity = jest.fn();

      instance.fetchToursHandler();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.fetchRecentActivity);
    });
  });

  describe('fetchRecentActivity()', () => {
    it('should call resaga.dispatchTo', () => {
      rendered.setProps({ loading: false });

      instance.fetchRecentActivity();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.dispatchTo);
    });

    it('should fetchRecentActivity', () => {
      rendered.setProps({ loading: true });

      expect(instance.fetchRecentActivity()).toBe(DO_NOTHING);
    });
  });

  describe('handleFindToursSuccess()', () => {
    it('should handleFindToursSuccess()', () => {
      instance.handleFindToursSuccess({ require: { userIds: [11] } });

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });

    it('should NOT call handleFindToursSuccess() 1', () => {
      expect(instance.handleFindToursSuccess({})).toBe(null);
    });

    it('should NOT call handleFindToursSuccess() 2', () => {
      instance.handleFindToursSuccess({ require: {} });
      expect(instance.handleFindToursSuccess({ require: {} })).toBe(null);
    });
  });

  describe('loadedOnce()', () => {
    it('should loadedOnce()', () => {
      instance.loadedOnce();

      expect(rendered.state().loadedOnce).toBe(true);
    });
  });

  describe('handleSearch()', () => {
    it('should call handleSearch', done => {
      instance.changeSearch = jest.fn();
      instance.updateNode = jest.fn();

      instance.handleSearch(2222);
      instance.handleSearch(1111); // should cancel the first call

      setTimeout(() => {
        TEST_HELPERS.expectCalledAndMatchSnapshot(instance.changeSearch);
        done();
      }, 300 + 10); // a bit after debounce function is called to prevent this test randomly failing
    });
  });

  describe('changeSearch()', () => {
    it('should changeSearch()', () => {
      instance.changeSearch(1123);

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue, {
        search: 1123,
      });
    });
  });

  describe('clearSearch()', () => {
    it('should clearSearch()', () => {
      instance.clearSearch();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue, {
        search: '',
      });
    });
  });

  describe('clearSelectedOrg()', () => {
    it('should return null', () => {
      rendered.setProps({ minimise: true });

      instance.clearSelectedOrg();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should clearSelectedOrg', () => {
      rendered.setProps({ minimise: false });

      instance.clearSelectedOrg();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });
    it('should clearSelectedOrg and selectedFeatured', () => {
      rendered.setProps({ minimise: true, selectedFeatured: true });

      instance.clearSelectedOrg();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
    it('should clear selectedFeatured', () => {
      rendered.setProps({
        minimise: false,
        selectedFeatured: true,
      });

      instance.clearSelectedOrg();
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
    it('should clear selectedFeaturedMinimise', () => {
      rendered.setProps({
        minimise: false,
        selectedFeatured: false,
        selectedFeaturedMinimise: true,
      });

      instance.clearSelectedOrg();
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('selectedOrgId()', () => {
    it('should return selectedOrgId', () => {
      rendered.setProps({ minimise: true, selectedOrgId: 2233 });

      expect(instance.selectedOrgId()).toBe(2233);
    });
  });

  describe('renderOrganisation()', () => {
    it('should renderOrganisation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisation(true), [-1]);
    });
  });

  describe('renderPesonaTitle()', () => {
    it('should renderPesonaTitle', () => {
      rendered.setProps({ location: { pathname: 'ssss' } });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPesonaTitle());
    });
  });

  describe('renderOrganisations()', () => {
    it('should renderOrganisations', () => {
      instance.renderOrganisation = jest.fn(() => () => 'renderOrganisation');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisations, [
        { organisations: [-1, 2] },
      ]);
    });
  });

  describe('renderNewTourButton()', () => {
    it('should renderNewTourButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewTourButton, [{}]);
    });
  });

  describe('renderSearch()', () => {
    it('should renderSearch', () => {
      rendered.setProps({ search: '2233' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSearch);
    });
  });

  describe('renderStarredCard()', () => {
    it('should return null', () => {
      rendered.setProps({ search: 'search' });

      expect(instance.renderStarredCard(false)()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ stars: [1, 2, 3] });

      expect(instance.renderStarredCard(false, true)({ scope: [4, 5] })).toBe(
        null,
      );
    });

    it('should renderStarredCard', () => {
      rendered.setProps({ stars: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredCard());
    });

    it('should render with featuredTours', () => {
      rendered.setProps({
        featuredTours: {
          1: { content: 1 },
          2: { content: 2 },
        },
        selectedFeatured: true,
      });
      instance.selectedOrgId = jest.fn(() => FEATURED);
      TEST_HELPERS.expectMatchSnapshot(instance.renderStarredCard(true));
    });
  });

  describe('renderRecentCard()', () => {
    it('should return null', () => {
      rendered.setProps({ search: 'search' });

      expect(instance.renderRecentCard(false)).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ recent: [] });

      expect(instance.renderRecentCard(false)).toBe(null);
    });

    it('should renderRecentCard', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRecentCard, [
        { recent: [1, 2], active: true },
      ]);
    });
  });

  describe('renderBack()', () => {
    it('should return null', () => {
      expect(instance.renderBack()).toBe(null);
    });

    it('should renderBack', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBack, [2233]);
    });
  });

  describe('renderWhole()', () => {
    it('should renderWhole', () => {
      instance.renderStarred = jest.fn(() => 'renderStarred');
      instance.renderRecent = jest.fn(() => 'renderRecent');
      instance.renderFeaturedCard = jest.fn(() => 'renderFeaturedCard');

      TEST_HELPERS.expectMatchSnapshot(instance.renderWhole);
    });
  });

  describe('renderContent()', () => {
    it('should renderStarredCard', () => {
      instance.renderStarredCard = jest.fn(() => () => 'renderStarredCard');

      expect(instance.renderContent(STARRED)).toBe('renderStarredCard');
    });

    it('should renderRecentCard', () => {
      instance.renderRecentCard = jest.fn(() => 'renderRecentCard');

      expect(instance.renderContent(RECENT)).toBe('renderRecentCard');
    });

    it('should renderRecent', () => {
      instance.renderOrganisation = jest.fn(() => () => 'renderOrganisation');

      expect(instance.renderContent(2233)).toBe('renderOrganisation');
    });

    it('should renderWhole', () => {
      instance.renderWhole = jest.fn(() => 'renderWhole');

      expect(instance.renderContent()).toBe('renderWhole');
    });
  });

  describe('cleanUp()', () => {
    it('should not break', () => {
      expect(instance.cleanUp()()).toEqual([]);
    });
    it('should remove ids doesnt exists', () => {
      expect(instance.cleanUp([1, 2])([1, 2, 3])).toEqual([1, 2]);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderBack = jest.fn(() => 'renderBack');
      instance.renderSearch = jest.fn(() => 'renderSearch');
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderPesonaTitle = jest.fn(() => 'renderContent');
      rendered.selectedOrgId = jest.fn(() => 'not org');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
