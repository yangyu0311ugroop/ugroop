import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { School } from '../index';

describe('<School />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    match: {},
    history: {},
    location: { pathname: '/1/2/3' },
    resaga,
    id: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<School {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(School).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderListItem()', () => {
    it('should renderListItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItem);
    });

    it('should renderListItem with data', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderListItem, [
        {
          subnav: 'subnav',
          heading: 'heading',
          content: 'content',
          body: 'body',
          extras: 'extras',
          divider: false,
        },
      ]);
    });
  });

  describe('renderTypeContent()', () => {
    it('should renderTypeContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTypeContent);
    });
  });

  describe('renderGenderContent()', () => {
    it('should renderGenderContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderGenderContent);
    });
  });

  describe('renderType()', () => {
    it('should renderType', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderType);
    });
  });

  describe('renderGender()', () => {
    it('should renderGender', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderGender);
    });
  });

  describe('renderSchoolInfo()', () => {
    it('should renderSchoolInfo', () => {
      instance.renderTypeContent = jest.fn(() => 'renderProfile');
      instance.renderGenderContent = jest.fn(() => 'renderContact');
      TEST_HELPERS.expectMatchSnapshot(instance.renderSchoolInfo);
    });
  });

  describe('renderBreadcrumbs()', () => {
    it('should return null', () => {
      rendered.setProps({ location: { pathname: '/1/2/3' } });

      expect(instance.renderBreadcrumbs()).toBe(null);
    });

    it('should renderBreadcrumbs', () => {
      rendered.setProps({ location: { pathname: '/1/2/3/4/photo' } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBreadcrumbs);
    });
  });

  describe('renderSchool()', () => {
    it('should renderSchool', () => {
      TEST_HELPERS.expectDefined(instance.renderSchool);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
