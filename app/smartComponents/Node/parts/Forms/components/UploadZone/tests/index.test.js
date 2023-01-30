import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { FormsUploadZone } from '..';

describe('<UploadZone />', () => {
  let wrapper;
  let instance;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const makeProps = () => ({
    templateId: 1,
    classes: {},
    uploadFile: {
      subscribeSuccess: jest.fn(),
      enqueueFile: jest.fn(),
    },
    resaga,
  });

  beforeEach(() => {
    wrapper = shallow(<FormsUploadZone {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render attachment', () => {
      wrapper.setProps({ simple: false });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('handleUploadSuccess', () => {
    it('should call createNodeAndAttachment', () => {
      NODE_API_HELPERS.createNodeAndAttachment = jest.fn();
      instance.handleUploadSuccess();
      expect(NODE_API_HELPERS.createNodeAndAttachment).toHaveBeenCalled();
    });
  });

  describe('uploadSuccess', () => {
    it('should call afterUpload', () => {
      const afterUpload = jest.fn();
      instance.uploadSuccess({}, 1, afterUpload)({});
      expect(afterUpload).toHaveBeenCalled();
    });
  });

  describe('removeAttachment', () => {
    it('should call removeAttachment', () => {
      const onRemoveFile = jest.fn();
      instance.removeAttachment({ id: 1, onRemoveFile })();
      expect(onRemoveFile).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit', () => {
      wrapper.setProps({ attachmentIds: [1, 2], formIds: [1, 2] });
      NODE_API_HELPERS.updateAttachment = jest.fn();
      const param = {
        id: 1,
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn(),
        index: 1,
      };
      instance.onSubmit(param);
      expect(NODE_API_HELPERS.updateAttachment).toHaveBeenCalled();
    });
  });

  describe('renderDelete()', () => {
    it('should renderDelete', () => {
      wrapper.setProps({ attachmentIds: [1, 2], formIds: [1, 2] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDelete, [
        { id: 1, onRemoveFile: jest.fn() },
      ]);
    });
  });

  describe('renderEditableAttachment()', () => {
    it('should renderEditableAttachment', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditableAttachment);
    });
  });

  describe('handleDrop()', () => {
    it('should handleDrop', () => {
      const files = [{ name: 'Elijah' }];
      TEST_HELPERS.expectMatchSnapshot(instance.handleDrop(files));
    });
  });
});
