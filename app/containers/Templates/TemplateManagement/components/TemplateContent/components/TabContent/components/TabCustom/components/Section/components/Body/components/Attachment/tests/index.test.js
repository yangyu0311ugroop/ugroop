import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NODE_API, UPDATE_ATTACHMENT } from 'apis/constants';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { uploadStatus } from 'utils/constant';
import { Attachment } from '../index';

describe('<Attachment />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    sectionId: 3,
    id: 13,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Attachment {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Attachment).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onUploadFileSuccess()', () => {
    it('should set state and call handleChange', () => {
      const spy = jest.fn();
      instance.handleChange = jest.fn(() => spy);

      instance.onUploadFileSuccess({ name: 'abc', size: 123 })({
        result: { files: { 'file-to-upload': { downloadURL: 'xyz' } } },
      });
      expect(rendered.state().fileUploadStatus).toEqual(uploadStatus.success);
      expect(instance.handleChange).toBeCalledWith('attachment');
      expect(spy).toBeCalledWith({
        id: 13,
        name: 'abc',
        url: 'xyz',
        fileSize: 123,
        removed: false,
        nodeId: 3,
      });
    });

    it('should not set state and not call handleChange', () => {
      instance.handleChange = jest.fn();

      instance.onUploadFileSuccess({ name: 'abc', size: 123 })();
      expect(rendered.state().fileUploadStatus).not.toEqual(
        uploadStatus.success,
      );
      expect(instance.handleChange).not.toBeCalled();
    });
  });

  describe('uploadFile()', () => {
    it('should call resaga.dispatchTo', () => {
      instance.uploadFile(12333);
      expect(rendered.state().fileUploadStatus).toEqual(uploadStatus.pending);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('should call resaga.dispatchTo UPLOAD', () => {
      rendered.setProps({ id: 0 });
      instance.uploadFile({ name: 'myFile' });
      expect(rendered.state().fileUploadStatus).toEqual(uploadStatus.pending);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('removeFile()', () => {
    it('should call dispatchTo', () => {
      rendered.setProps({
        sectionId: 1,
      });
      instance.removeFile();
      expect(props.resaga.dispatchTo).toBeCalledWith(
        NODE_API,
        UPDATE_ATTACHMENT,
        {
          payload: {
            id: 1,
            attachmentId: 13,
            description: '',
            name: '',
            url: '',
            fileSize: 0,
            isSection: true,
          },
        },
      );
    });
  });

  describe('handleChange()', () => {
    it('should call setValue', () => {
      sections.upsert = jest.fn();

      instance.handleChange('attachment')({
        name: 'abc',
        fileSize: 123,
        description: 'ffff',
      });

      expect(sections.upsert).toBeCalled();
      expect(sections.upsert.mock.calls).toMatchSnapshot();
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderEditMode()', () => {
    it('should call setValue', () => {
      const snapshot = shallow(<div>{instance.renderEditMode()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFileName()', () => {
    it('should render pending', () => {
      rendered.setProps({ fileSize: 0 });

      const snapshot = shallow(<div>{instance.renderFileName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render link', () => {
      rendered.setProps({
        fileSize: 123,
        name: 'hello',
        attachmentURL: 'holla',
      });

      const snapshot = shallow(<div>{instance.renderFileName()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderReadOnly()', () => {
    it('should render empty span', () => {
      rendered.setProps({ fileSize: 0, description: '' });

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render file size', () => {
      rendered.setProps({ fileSize: 123, description: '' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render description', () => {
      rendered.setProps({ fileSize: 0, description: 'abccc' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render both', () => {
      rendered.setProps({ fileSize: 123, description: 'abccc' });
      instance.renderFileName = () => 'renderFileName';

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderEditMode = () => 'renderEditMode';
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render view mode', () => {
      rendered.setProps({ readonly: true, showHr: true });

      instance.renderReadOnly = () => 'renderReadOnly';
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
