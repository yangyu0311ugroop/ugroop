import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { UploadButton } from '../index';

describe('<UploadButton />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const uploadFile = {
    subscribeSuccess: jest.fn(),
    enqueueFile: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
  };

  beforeEach(() => {
    rendered = shallow(<UploadButton {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(UploadButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should subscribe to uploadFile', () => {
      instance.componentDidMount();
      expect(uploadFile.subscribeSuccess).toBeCalledWith(
        instance.handleUploadSuccess,
      );
    });
  });

  describe('handleSuccess', () => {
    it('should open snackbar', () => {
      SNACKBAR_HELPER.openSuccessSnackbar = jest.fn();
      instance.handleSuccess();

      expect(SNACKBAR_HELPER.openSuccessSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleError', () => {
    it('should open snackbar', () => {
      SNACKBAR_HELPER.openErrorSnackbar = jest.fn();
      instance.handleError();

      expect(SNACKBAR_HELPER.openErrorSnackbar).toBeCalled();
      expect(SNACKBAR_HELPER.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleUploadSuccess', () => {
    it('should call createEventAttachment api', () => {
      TEMPLATE_API_HELPERS.createEventAttachment = jest.fn();
      rendered.setProps({
        templateId: 1,
        eventId: 1,
      });
      const data = { name: 'sample.png', url: '/sample' };
      instance.handleUploadSuccess(data);

      expect(TEMPLATE_API_HELPERS.createEventAttachment).toBeCalledWith(
        {
          eventId: 1,
          templateId: 1,
          data: {
            name: data.name,
            link: data.url,
          },
          onSuccess: instance.handleSuccess,
          onError: instance.handleError,
        },
        resaga,
      );
    });
  });

  describe('handleDrop', () => {
    it('should enqueue the file given by file drop zone', () => {
      const files = [{ name: 'sampleFile.png' }];
      instance.handleDrop(files);

      expect(uploadFile.enqueueFile).toBeCalledWith(files[0], files[0].name);
    });
  });

  describe('handleDropZone', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDropZone()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should match snapshot', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
