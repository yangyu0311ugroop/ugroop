import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Profile } from '../index';

describe('<Profile />', () => {
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

    rendered = shallow(<Profile {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Profile).toBeDefined();
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

  describe('renderPhotoExtras()', () => {
    it('should return null', () => {
      rendered.setProps({ smDown: true });

      expect(instance.renderPhotoExtras()).toBe(null);
    });

    it('should renderPhotoExtras', () => {
      rendered.setProps({ smDown: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoExtras);
    });
  });

  describe('renderPhotoBody()', () => {
    it('should return null', () => {
      rendered.setProps({ smDown: false });

      expect(instance.renderPhotoBody()).toBe(null);
    });

    it('should renderPhotoBody', () => {
      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhotoBody);
    });
  });

  describe('renderNameContent()', () => {
    it('should renderNameContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNameContent);
    });

    it('should renderNameContent knownAs', () => {
      rendered.setProps({
        firstName: 'firstName',
        lastName: 'lastName',
        knownAs: 'knownAs',
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNameContent);
    });
  });

  describe('renderAddress()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddress);
    });
  });

  describe('renderType()', () => {
    it('should renderType', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderType);
    });
  });

  describe('renderWebsite()', () => {
    it('should renderWebsite', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderWebsite);
    });
  });

  describe('renderEmailContent()', () => {
    it('should renderEmailContent', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmailContent);
    });

    it('should renderEmailContent secondaryEmail', () => {
      rendered.setProps({ secondaryEmail: 'secondaryEmail' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmailContent);
    });
  });

  describe('renderContact()', () => {
    it('should renderContact', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContact);
    });
  });

  describe('renderOthers()', () => {
    it('should renderOthers', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOthers);
    });
  });

  describe('renderPersonalInfo()', () => {
    it('should renderPersonalInfo', () => {
      instance.renderProfile = jest.fn(() => 'renderProfile');
      instance.renderContact = jest.fn(() => 'renderContact');
      instance.renderOthers = jest.fn(() => 'renderOthers');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonalInfo);
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

  describe('renderName()', () => {
    it('should renderName', () => {
      TEST_HELPERS.expectDefined(instance.renderName);
    });
  });

  describe('renderTypeContent()', () => {
    it('should renderTypeContent', () => {
      TEST_HELPERS.expectDefined(instance.renderTypeContent);
    });
  });

  describe('renderWebsiteContent()', () => {
    it('should renderWebsiteContent', () => {
      TEST_HELPERS.expectDefined(instance.renderWebsiteContent);
    });
  });

  describe('renderAddressContent()', () => {
    it('should renderAddressContent', () => {
      TEST_HELPERS.expectDefined(instance.renderAddressContent);
    });
  });

  describe('renderProfile()', () => {
    it('should renderProfile', () => {
      TEST_HELPERS.expectDefined(instance.renderProfile);
    });
  });

  describe('renderOrgInfo()', () => {
    it('should renderOrgInfo', () => {
      TEST_HELPERS.expectDefined(instance.renderOrgInfo);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
