import { shallow } from 'enzyme';
import React from 'react';
import {
  ORGANISERS,
  PUBLIC,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TabAccess } from '../index';

describe('<TabAccess />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = { push: jest.fn() };

  const props = {
    classes: {},
    location: {},
    history,
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TabAccess {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabAccess).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDefault', () => {
    it('should match snapshot', () => {
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('changeTabAccess()', () => {
    it('should not do anything', () => {
      rendered.setProps({ sharedWith: '1122', createdBy: 'j', me: 'j' });

      expect(instance.changeTabAccess('1122')()).toBe(null);
    });

    it('should call resaga.dispatchTo', () => {
      rendered.setProps({ sharedWith: '1122' });

      instance.changeTabAccess('2233')();

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('changeAccessSuccess()', () => {
    it('should not call push()', () => {
      instance.changeAccessSuccess({}, { node: { sharedWith: PUBLIC } });

      TEST_HELPERS.expectNotCalled(history.push);
    });

    it('should changeAccessSuccess()', () => {
      instance.changeAccessSuccess({}, { node: { sharedWith: 'NOT PUBLIC' } });

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('renderButton()', () => {
    it('should return null', () => {
      rendered.setProps({ simple: true, showPublic: false });

      expect(instance.renderButton({})).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({
        simple: true,
        showPublic: false,
        sharedWith: PUBLIC,
      });

      expect(instance.renderButton({})).toBe(null);
    });
    it('should return null 2', () => {
      rendered.setProps({
        simple: true,
        showPublic: true,
        sharedWith: PUBLIC,
      });

      expect(instance.renderButton({})).not.toBe(null);
    });

    it('should renderPrivateButton simple editable showPublic', () => {
      rendered.setProps({
        simple: true,
        editable: true,
        showPublic: true,
        sharedWith: ORGANISERS,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });

    it('should renderPrivateButton simple !editable showPublic', () => {
      rendered.setProps({
        simple: true,
        editable: false,
        showPublic: true,
        sharedWith: ORGANISERS,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });

    it('should renderButton !simple !editable', () => {
      rendered.setProps({ simple: false, editable: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });

    it('should renderButton !simple editable', () => {
      instance.isPrint = jest.fn(() => true);
      rendered.setProps({
        simple: false,
        editable: true,
        sharedWith: 'everyOne',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('renderPrivateMenu()', () => {
    it('should renderPrivateMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPrivateMenu, [{}]);
    });
  });
  describe('renderPrintModeMenu()', () => {
    it('should renderPrintModeMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPrintModeMenu, [{}]);
    });
  });
  describe('renderPrintMode()', () => {
    it('should renderPrintModeMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPrintMode);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
