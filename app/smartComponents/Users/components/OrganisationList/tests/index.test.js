import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { GUEST, ADMIN, MEMBER } from 'utils/modelConstants';
import { OrganisationList } from '../index';

describe('<OrganisationList />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<OrganisationList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OrganisationList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleShowAll()', () => {
    it('should toggleShowAll', () => {
      instance.toggleShowAll();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('isOrganisationActive()', () => {
    it('should return null', () => {
      expect(instance.isOrganisationActive()(true)).toBe(true);
    });

    it('should isOrganisationActive', () => {
      rendered.setProps({ organisationIdFromNode: 2233 });

      expect(instance.isOrganisationActive(2233)()).toBe(true);
    });
  });

  describe('organisations()', () => {
    it('should organisations()', () => {
      rendered.setProps({
        orgUsers: {
          1: { role: GUEST },
          2: { role: MEMBER },
          3: { role: ADMIN },
        },
        organisations: [1, 2, 3],
      });

      expect(instance.organisations()).toEqual([2, 3]);
    });

    it('should organisations() hidden', () => {
      rendered.setProps({
        orgUsers: {
          1: { role: GUEST },
          2: { role: MEMBER },
          3: { role: ADMIN },
        },
        organisations: [1, 2, 3],
        maxRender: 1,
      });

      expect(instance.organisations()).toEqual([2]);
    });
  });

  describe('renderTourCount', () => {
    it('should return count', () => {
      const obj = { count: 1 };
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourCount(obj));
    });
    it('should return count if count > 1', () => {
      const obj = { count: 2 };
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourCount(obj));
    });
    it('should return null', () => {
      expect(instance.renderTourCount({ count: 0 })).toEqual(null);
    });
  });

  describe('renderPersonal()', () => {
    it('should renderPersonal', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonal);
    });
  });

  describe('renderOrganisation()', () => {
    it('should renderOrganisation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisation);
    });
    it('should renderOrganisation to rendered some other link', () => {
      rendered.setProps({
        redirectToUrl: jest.fn(() => 'ugroop.com'),
        organisations: [1, 2, 3],
        excludeOrg: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisation, [1]);
    });
  });

  describe('renderOrganisations()', () => {
    it('should renderOrganisations', () => {
      instance.organisations = jest.fn(() => [1, 2]);
      instance.renderOrganisation = jest.fn(() => 'renderOrganisation');

      TEST_HELPERS.expectMatchSnapshot(instance.renderOrganisations);
    });
  });

  describe('renderNewOrganisation()', () => {
    it('should renderNewOrganisation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewOrganisation);
    });
    it('should renderNewOrganisation', () => {
      rendered.setProps({ canCreate: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewOrganisation);
    });
  });

  describe('renderShowAllOrganisations()', () => {
    it('should return null', () => {
      rendered.setProps({ showAllOrganisations: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowAllOrganisations);
    });

    it('should renderShowAllOrganisations', () => {
      rendered.setProps({ showAllOrganisations: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowAllOrganisations);
    });
  });

  describe('renderShowMore()', () => {
    it('should return null', () => {
      instance.organisations = jest.fn(() => [1, 2, 3]);
      rendered.setProps({ maxRender: 5 });

      expect(instance.renderShowMore()).toBe(null);
    });

    it('should renderShowMore', () => {
      instance.organisations = jest.fn(() => [1, 2, 3]);
      rendered.setProps({ maxRender: 2, showAllOrganisations: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowMore);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      expect(instance.render()).toBe('children');
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
