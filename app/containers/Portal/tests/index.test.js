import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Portal } from '../index';

describe('<Portal />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    portalIds: [1],
  };

  beforeEach(() => {
    rendered = shallow(<Portal {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Portal).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('closePortal()', () => {
    it('should call setValue', () => {
      instance.closePortal();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
