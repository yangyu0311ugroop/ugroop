import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddTab } from '../index';

describe('<AddTab />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const location = {
    pathname: 'pathname',
  };

  const props = {
    classes: {},
    resaga,
    history,
    location,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<AddTab {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddTab).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleClose();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should return null', () => {
      instance.setState({ creating: true });

      expect(instance.handleValidSubmit()).toBe(null);
    });

    it('should handleValidSubmit', () => {
      instance.createTab = jest.fn();
      instance.setState({ creating: false });

      instance.handleValidSubmit();

      expect(instance.createTab).toBeCalled();
    });
  });

  describe('createTab()', () => {
    it('should createTab()', () => {
      instance.createTab({ content: 'hello' })();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess()', () => {
      instance.handleClose = jest.fn(() => '');
      instance.openNewTab = jest.fn(() => '');

      instance.handleCreateSuccess({ node: { id: 2323 } });

      TEST_HELPERS.expectCalled(instance.handleClose);
      TEST_HELPERS.expectCalled(instance.openNewTab);
    });
  });

  describe('openNewTab()', () => {
    it('should openNewTab()', () => {
      instance.openNewTab();

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('renderFormButtons()', () => {
    it('should renderFormButtons', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFormButtons);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderFormButtons = jest.fn(() => 'renderFormButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
