import { shallow } from 'enzyme';
import React from 'react';
import { URL_HELPERS } from 'appConstants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Dashboard, HOME_PAGES } from '../index';

describe('<Dashboard />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    page: 'pathname',
    homepage: 'path',
    location: { pathname: 'pathname' },
    match: { path: 'path' },
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Dashboard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Dashboard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should not call any function', () => {
      rendered.setProps({ page: 'pathname', homepage: 'path' });
      instance.handleChangePage = jest.fn();
      instance.handleChangeHomePage = jest.fn();

      instance.componentWillReceiveProps(props);

      TEST_HELPERS.expectNotCalled(instance.handleChangePage);
      TEST_HELPERS.expectNotCalled(instance.handleChangeHomePage);
    });

    it('should componentWillReceiveProps', () => {
      rendered.setProps({ page: 'old pathname', homepage: 'old path' });
      instance.handleChangePage = jest.fn();
      instance.handleChangeHomePage = jest.fn();

      instance.componentWillReceiveProps(props);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleChangePage);
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleChangeHomePage);
    });
  });

  describe('componentDidMount()', () => {
    it('should fetch ability', () => {
      rendered.setProps({ location: { pathname: URL_HELPERS.index() } });
      instance.handleChangePage = jest.fn();
      instance.handleChangeHomePage = jest.fn();
      instance.componentDidMount();
    });
  });
  describe('handleChangePage()', () => {
    it('should handleChangePage()', () => {
      instance.handleChangePage({ pathname: 'to change' });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('handleChangeHomePage()', () => {
    it('should handleChangeHomePage()', () => {
      instance.handleChangeHomePage({ path: HOME_PAGES[0] });

      expect(resaga.setValue).toBeCalledWith({ homepage: HOME_PAGES[0] });
    });

    it('should not handleChangeHomePage()', () => {
      instance.handleChangeHomePage({ path: 'not home page' });

      expect(resaga.setValue).not.toBeCalledWith({ homepage: 'not home page' });
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu smDown', () => {
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu);
    });

    it('should renderMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu);
    });
  });

  describe('renderCreateOrg()', () => {
    it('should renderCreateOrg', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCreateOrg);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderMenu = jest.fn(() => 'renderMenu');

      expect(instance.render()).toBeDefined();
    });
  });
});
