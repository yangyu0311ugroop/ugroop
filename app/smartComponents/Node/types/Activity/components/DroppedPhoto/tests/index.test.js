import { UPLOADING } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DroppedPhoto, renderFileSize } from '../index';

describe('<DroppedPhoto />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    removePhoto: jest.fn(),
    rotateLeft: jest.fn(),
    rotateRight: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<DroppedPhoto {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DroppedPhoto).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('uploading()', () => {
    it('should return false', () => {
      rendered.setProps({ status: UPLOADING, errorMessage: '33' });

      expect(instance.uploading()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ status: UPLOADING, errorMessage: '' });

      expect(instance.uploading()).toBe(true);
    });
  });

  describe('renderImage()', () => {
    it('should return image', () => {
      rendered.setProps({ uploadedURL: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderImage);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({ errorMessage: 'error' });
      instance.uploading = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('renderFileSize()', () => {
    it('should return KB', () => {
      expect(renderFileSize(23000)).toMatchSnapshot();
    });

    it('should return MB', () => {
      expect(renderFileSize(23000000)).toMatchSnapshot();
    });
  });
});
