import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AboutCard } from '../index';

describe('<AboutCard />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<AboutCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AboutCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
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
  });

  describe('peopleCount()', () => {
    it('should render peopleCount', () => {
      rendered.setProps({ people: [1, 2, 3] });
      TEST_HELPERS.expectMatchSnapshot(instance.peopleCount);
    });
  });

  describe('render()', () => {
    it('should renderPersonal', () => {
      instance.renderPersonal = jest.fn(() => 'renderPersonal');

      rendered.setProps({ organisationId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderOrganisation', () => {
      instance.renderOrganisation = jest.fn(() => 'renderOrganisation');

      rendered.setProps({ organisationId: 3 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
