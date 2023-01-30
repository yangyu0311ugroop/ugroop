import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PhotoPlaceHolder } from '../index';

describe('<PhotoPlaceHolder />', () => {
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

    rendered = shallow(<PhotoPlaceHolder {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PhotoPlaceHolder).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('open()', () => {
    it('should open', () => {
      instance.open();

      expect(rendered.state().open).toBe(true);
    });
  });

  describe('close()', () => {
    it('should close', () => {
      instance.close();

      expect(rendered.state().open).toBe(false);
    });
  });

  describe('openPreview()', () => {
    it('should NOT openPreview', () => {
      rendered.setProps({ showPreview: false });
      rendered.setState({ preview: false });

      instance.openPreview();

      expect(rendered.state().preview).toBe(false);
    });

    it('should openPreview', () => {
      const onClick = jest.fn();
      rendered.setProps({ onClick });

      instance.openPreview();

      TEST_HELPERS.expectCalled(onClick);
    });

    it('should openPreview', () => {
      rendered.setProps({ showPreview: true });

      instance.openPreview();

      expect(rendered.state().preview).toBe(true);
    });
  });

  describe('closePreview()', () => {
    it('should closePreview', () => {
      instance.closePreview();

      expect(rendered.state().preview).toBe(false);
    });
  });

  describe('showPreviewError()', () => {
    it('sets state.previewError', () => {
      instance.showPreviewError();
      expect(rendered.state().previewError).toBe(true);
    });
  });

  describe('handleDelete()', () => {
    it('should handleDelete', () => {
      const onDeleteClick = jest.fn();
      rendered.setProps({ onDeleteClick });
      instance.close = jest.fn();

      instance.handleDelete();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.close);
      TEST_HELPERS.expectCalledAndMatchSnapshot(onDeleteClick);
    });
  });

  describe('imgSrc()', () => {
    it('should imgSrc', () => {
      rendered.setProps({ cropMetaInfo: null });

      TEST_HELPERS.expectMatchSnapshot(instance.imgSrc);
    });
  });

  describe('deleteDialog()', () => {
    it('should deleteDialog', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.deleteDialog);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton label', () => {
      rendered.setProps({ imgSrc: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });

    it('should renderButton', () => {
      rendered.setProps({ imgSrc: 'imgSrc' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [{}]);
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [{}]);
    });
  });

  describe('renderCoverPhotoPopper()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: false });

      expect(instance.renderCoverPhotoPopper()).toBe(null);
    });

    it('should renderCoverPhotoPopper', () => {
      rendered.setProps({ editable: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCoverPhotoPopper);
    });
  });

  describe('renderDownload()', () => {
    it('should return null', () => {
      rendered.setProps({ showDownload: false });

      expect(instance.renderDownload()).toBe(null);
    });

    it('should renderDownload', () => {
      rendered.setProps({ showDownload: true });
      instance.imgSrc = jest.fn();

      TEST_HELPERS.expectMatchSnapshot(instance.renderDownload);
    });
  });

  describe('renderImagePreview()', () => {
    it('should return null', () => {
      rendered.setProps({ showPreview: false });

      expect(instance.renderImagePreview()).toBe(null);
    });

    it('should renderImagePreview', () => {
      Date.now = jest.fn(() => 'date.now');

      TEST_HELPERS.expectMatchSnapshot(instance.renderImagePreview);
    });

    it('should renderImagePreview for previewError', () => {
      Date.now = jest.fn(() => 'date.now');
      instance.setState({ previewError: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderImagePreview);
    });
  });

  describe('renderDialog()', () => {
    it('should return null', () => {
      rendered.setProps({ photoId: 0 });

      expect(instance.renderDialog()).toBe(null);
    });

    it('should call renderPreview', () => {
      const renderPreview = jest.fn(() => 'renderPreview');

      rendered.setProps({ photoId: 9, renderPreview });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDialog);
    });

    it('should renderDialog', () => {
      instance.renderImagePreview = jest.fn(() => 'renderImagePreview');
      rendered.setProps({ photoId: 1 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDialog);
    });
  });

  describe('renderImage()', () => {
    it('should return null if !showPreview', () => {
      rendered.setProps({ showPreview: false, cropMetaInfo: null });

      TEST_HELPERS.expectNull(instance.renderImage);
    });

    it('should previewError', () => {
      rendered.setProps({ previewError: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderImage);
    });

    it('should renderImage no cropMetaInfo', () => {
      rendered.setProps({ imgSrc: 'imgSrc' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderImage);
    });

    it('should renderImage', () => {
      rendered.setProps({ imgSrc: 'imgSrc', cropMetaInfo: { x: 1 } });

      TEST_HELPERS.expectMatchSnapshot(instance.renderImage);
    });
  });

  describe('render()', () => {
    it('should render !editable', () => {
      rendered.setProps({ showOverlay: true, editable: false, imgSrc: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render correctly', () => {
      rendered.setProps({
        showOverlay: true,
        editable: true,
        imgSrc: 'img',
        showPreview: false,
        onClick: jest.fn(),
      });
      instance.renderCoverPhotoPopper = jest.fn(() => 'renderCoverPhotoPopper');
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.renderDialog = jest.fn(() => 'renderDialog');
      instance.deleteDialog = jest.fn(() => 'deleteDialog');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('still matches snapshot if props.showOverlay + no image', () => {
      rendered.setProps({ showOverlay: true, editable: false, imgSrc: null });
      instance.renderCoverPhotoPopper = jest.fn(() => 'renderCoverPhotoPopper');
      instance.renderImage = jest.fn(() => 'renderImage');
      instance.renderDialog = jest.fn(() => 'renderDialog');
      instance.deleteDialog = jest.fn(() => 'deleteDialog');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
