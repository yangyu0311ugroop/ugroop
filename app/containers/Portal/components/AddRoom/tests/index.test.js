import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddRoom } from '../index';

describe('<AddRoom />', () => {
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

    rendered = shallow(<AddRoom {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddRoom).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose()', () => {
      PORTAL_HELPERS.close = jest.fn(() => '');

      instance.handleClose();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('handleCreateSuccess()', () => {
    it('should handleCreateSuccess()', () => {
      instance.handleClose = jest.fn(() => '');

      instance.handleCreateSuccess('some room')({ node: { id: 9922 } });

      TEST_HELPERS.expectCalled(instance.handleClose);
      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('handleValidSubmit()', () => {
    it('should handleValidSubmit()', () => {
      NODE_API_HELPERS.createNode = jest.fn(() => '');

      instance.handleValidSubmit({
        content: 'content',
        description: 'description',
        roomCount: 2,
      });

      NODE_API_HELPERS.createNode(instance.mockFunction);
    });
  });

  describe('renderRoomTypeButton()', () => {
    it('should renderRoomTypeButton()', () => {
      instance.setState({ selectedType: 'Others' });
      NODE_API_HELPERS.createNode = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomTypeButton, [
        { openMenu: jest.fn() },
      ]);
    });
  });

  describe('handleSelectType()', () => {
    it('should handleSelectType()', () => {
      instance.setState({ selectedType: 'Others' });
      NODE_API_HELPERS.createNode = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.handleSelectType(1));
    });
  });

  describe('renderRoomTypeOptions()', () => {
    it('should renderRoomTypeOptions()', () => {
      instance.setState({ selectedType: 'Others' });
      NODE_API_HELPERS.createNode = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderRoomTypeOptions, [
        { openMenu: jest.fn() },
      ]);
    });
  });

  describe('renderSaveCancelButton()', () => {
    it('should renderSaveCancelButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSaveCancelButton);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderSaveCancelButton = jest.fn(() => 'renderSaveCancelButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
