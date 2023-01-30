import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DeleteNode } from '../index';

describe('<DeleteNode />', () => {
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

    rendered = shallow(<DeleteNode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DeleteNode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('deleteSuccess()', () => {
    it('should deleteSuccess()', () => {
      PORTAL_HELPERS.closePortal = jest.fn(() => '');

      instance.deleteSuccess();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
    });
  });

  describe('handleDelete()', () => {
    it('should handleDelete()', () => {
      rendered.setProps({ id: 11, parentId: 2299 });
      NODE_API_HELPERS.deleteNode = jest.fn();

      instance.handleDelete();

      TEST_HELPERS.expectCalled(NODE_API_HELPERS.deleteNode);
    });
  });

  describe('confirmDelete()', () => {
    it('should confirmDelete()', () => {
      PORTAL_HELPERS.confirmDelete = jest.fn();

      instance.confirmDelete();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDelete);
    });
  });

  describe('render()', () => {
    it('should not render noText', () => {
      rendered.setProps({ noText: false });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render noText', () => {
      rendered.setProps({ noText: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render renderProp', () => {
      rendered.setProps({ variant: 'renderProp' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
