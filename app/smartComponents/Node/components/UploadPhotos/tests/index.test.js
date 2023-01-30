import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { UploadPhotos } from '../index';

describe('<UploadPhotos />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 99,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<UploadPhotos {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UploadPhotos).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleDrop()', () => {
    it('should not call setValue', () => {
      rendered.setProps({ uploadPhotoDialogId: 1123 });
      PORTAL_HELPERS.openUploadPhotos = jest.fn();

      instance.handleDrop(1122);

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openUploadPhotos);
      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });

    it('should handleDrop', () => {
      rendered.setProps({ uploadPhotoDialogId: 0 });
      PORTAL_HELPERS.openUploadPhotos = jest.fn();

      instance.handleDrop(2233);

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openUploadPhotos);
      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderUploadPhotosButton()', () => {
    it('should renderUploadPhotosButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUploadPhotosButton);
    });

    it('should renderUploadPhotosButton full', () => {
      rendered.setProps({ full: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderUploadPhotosButton);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
