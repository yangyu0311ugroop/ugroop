import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { OrganisationName } from '../index';

describe('<OrganisationName />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
    organisationId: 2233,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<OrganisationName {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OrganisationName).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ organisationId: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render featuredTour tours', () => {
      rendered.setProps({ featuredTour: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render shared tours', () => {
      rendered.setProps({ organisationIds: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render org name', () => {
      rendered.setProps({ organisationIds: [2233] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
