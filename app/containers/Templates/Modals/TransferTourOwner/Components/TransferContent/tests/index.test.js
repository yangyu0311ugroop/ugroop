import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TransferContent } from '../index';

describe('<TransferContent />', () => {
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

    rendered = shallow(<TransferContent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransferContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('render()', () => {
    it('should isPending', () => {
      rendered.setProps({ isPending: true, transferByType: 'email' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderOrganisation', () => {
      instance.renderOrganisation = jest.fn(() => 'renderOrganisation');

      rendered.setProps({ emailSent: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
