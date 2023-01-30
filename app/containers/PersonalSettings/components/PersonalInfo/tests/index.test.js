import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PersonalInfo } from '../index';

describe('<PersonalInfo />', () => {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<PersonalInfo {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PersonalInfo).toBeDefined();
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

  describe('renderBirthDate()', () => {
    it('should return null', () => {
      rendered.setProps({ birthDate: '' });

      expect(instance.renderBirthDate()).toBe(null);
    });

    it('should renderBirthDate', () => {
      rendered.setProps({ birthDate: '1/2/1234' });

      TEST_HELPERS.expectDefined(instance.renderBirthDate);
    });
  });

  describe('renderBirthDayContent()', () => {
    it('should return null', () => {
      rendered.setProps({ birthDate: '', birthPlace: '' });

      expect(instance.renderBirthDayContent()).toBe(null);
    });

    it('should renderBirthDayContent', () => {
      instance.renderBirthDate = jest.fn(() => 'renderBirthDate');
      rendered.setProps({ birthDate: '10/10/2020', birthPlace: 'Melbourne' });

      TEST_HELPERS.expectDefined(instance.renderBirthDayContent);
    });
  });

  describe('renderProfile()', () => {
    it('should renderProfile', () => {
      instance.renderListItem = jest.fn(() => 'renderListItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderProfile);
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

  describe('renderInsuranceContent()', () => {
    it('should return null', () => {
      rendered.setProps({ insurancePolicy: '' });

      expect(instance.renderInsuranceContent()).toBe(null);
    });

    it('should renderInsuranceContent', () => {
      rendered.setProps({ insurancePolicy: 'insurancePolicy' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderInsuranceContent);
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
      rendered.setProps({ location: { pathname: '/1/2' } });

      expect(instance.renderBreadcrumbs()).toBe(null);
    });

    it('should renderBreadcrumbs', () => {
      rendered.setProps({ location: { pathname: '/1/2/photo' } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderBreadcrumbs);
    });
  });

  describe('renderName()', () => {
    it('should renderName', () => {
      TEST_HELPERS.expectDefined(instance.renderName);
    });
  });

  describe('renderBirthday()', () => {
    it('should renderBirthday', () => {
      TEST_HELPERS.expectDefined(instance.renderBirthday);
    });
  });

  describe('renderGender()', () => {
    it('should renderGender', () => {
      TEST_HELPERS.expectDefined(instance.renderGender);
    });
  });

  describe('renderPassword()', () => {
    it('should renderPassword', () => {
      TEST_HELPERS.expectDefined(instance.renderPassword);
    });
  });

  describe('renderEmail()', () => {
    it('should renderEmail', () => {
      TEST_HELPERS.expectDefined(instance.renderEmail);
    });
  });

  describe('renderPhones()', () => {
    it('should renderPhones', () => {
      TEST_HELPERS.expectDefined(instance.renderPhones);
    });
  });

  describe('renderInsurancePolicy()', () => {
    it('should renderInsurancePolicy', () => {
      TEST_HELPERS.expectDefined(instance.renderInsurancePolicy);
    });
  });

  describe('renderMedicalConditions()', () => {
    it('should renderMedicalConditions', () => {
      TEST_HELPERS.expectDefined(instance.renderMedicalConditions);
    });
  });

  describe('renderDietaryRequirements()', () => {
    it('should renderDietaryRequirements', () => {
      TEST_HELPERS.expectDefined(instance.renderDietaryRequirements);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
