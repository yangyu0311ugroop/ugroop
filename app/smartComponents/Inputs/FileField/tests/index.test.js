import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { FileField } from '../index';

describe('<FileField />', () => {
  let rendered;
  let instance;

  const uploadFile = {
    enqueueFile: jest.fn(),
    subscribeSuccess: jest.fn(),
  };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
    setValue: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<FileField {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(FileField).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should subscribe success and set value of initial formsy', () => {
      const value = {
        name: 'name',
        type: 'image/png',
        size: 0,
        url: '/sample',
      };
      rendered.setProps({
        value,
      });
      instance.componentDidMount();

      expect(uploadFile.subscribeSuccess).toBeCalledWith(
        instance.handleUploadSuccess,
      );
      expect(props.setValue).toBeCalledWith(value);
    });
  });

  describe('handleUploadSuccess', () => {
    it('should setValue of value and setState', () => {
      const result = {
        responseFile: {
          type: 'image/png',
        },
        name: 'image.png',
        size: 1800,
        url: '/sample.png',
      };
      instance.handleUploadSuccess(result);

      expect(props.setValue).toBeCalledWith({
        type: result.responseFile.type,
        name: result.name,
        url: result.url,
        fileSize: result.size,
      });
    });
  });

  describe('handleDrop', () => {
    it('should enqueue first file', () => {
      const files = [{ name: 'file.png' }];
      instance.handleDrop(files);

      expect(uploadFile.enqueueFile).toBeCalledWith(files[0]);
    });
  });

  describe('handleClear', () => {
    it('should setValue of value and setState', () => {
      instance.setState = jest.fn();
      instance.handleClear();
      expect(props.setValue).toBeCalledWith({
        type: '',
        name: '',
        fileSize: 0,
        url: '',
      });
      expect(instance.setState).toBeCalledWith({ name: undefined });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
