import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PersonalSettings } from '../index';

describe('<PersonalSettings />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    match: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<PersonalSettings {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PersonalSettings).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderNav()', () => {
    it('should renderNav', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNav);
    });
  });

  describe('renderPersonalInfo()', () => {
    it('should renderPersonalInfo', () => {
      TEST_HELPERS.expectDefined(instance.renderPersonalInfo);
    });
  });

  describe('renderPassports()', () => {
    it('should renderPassports', () => {
      TEST_HELPERS.expectDefined(instance.renderPassports);
    });
  });

  describe('renderRolesTab()', () => {
    it('should renderRolesTab', () => {
      TEST_HELPERS.expectDefined(instance.renderRolesTab);
    });
  });

  describe('renderPreferences()', () => {
    it('should renderPreferences', () => {
      TEST_HELPERS.expectDefined(instance.renderPreferences);
    });
  });

  describe('renderBillingTab()', () => {
    it('should renderBillingTab', () => {
      TEST_HELPERS.expectDefined(instance.renderBillingTab);
    });
  });

  describe('renderRedirect()', () => {
    it('should renderRedirect', () => {
      TEST_HELPERS.expectDefined(instance.renderRedirect);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
