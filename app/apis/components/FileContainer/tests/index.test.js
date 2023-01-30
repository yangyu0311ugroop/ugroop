import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_API, CREATE_ATTACHMENT } from 'apis/constants';
import React from 'react';
import { FileContainer } from '..';

describe('<FileContainer />', () => {
  let wrapper;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    wrapper = shallow(<FileContainer {...props} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Node).toBeDefined();
  });

  describe('componentDidMount()', () => {
    it('should call setValue', () => {
      instance.componentDidMount();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('calls resaga.analyse()', () => {
      const nextProps = { x: 1 };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.props.resaga.analyse).toBeCalled();
      expect(instance.props.resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleUploadFileSuccess', () => {
    it('should be called if payload.setValueToStore exists', () => {
      const payload = {
        id: 1,
        fileName: 'fileName',
        description: 'description',
        setValueToStore: true,
      };
      const result = {
        result: {
          files: {
            'file-to-upload': {
              downloadURL: 'downloadURL',
              size: '1kb',
            },
          },
        },
      };

      instance.handleUploadFileSuccess(result, payload);
      expect(props.resaga.dispatchTo).toBeCalledWith(
        NODE_API,
        CREATE_ATTACHMENT,
        {
          payload: {
            ...result.result.files['file-to-upload'],
            id: payload.id,
            url: result.result.files['file-to-upload'].downloadURL,
            fileSize: result.result.files['file-to-upload'].size,
            description: payload.description,
            name: payload.fileName,
          },
        },
      );
    });
    it('should be called if payload.setValueToStore exists', () => {
      const payload = {
        id: 1,
        fileName: 'fileName',
        description: 'description',
        setValueToStore: false,
      };
      const result = {
        result: {
          files: {
            'file-to-upload': {
              downloadURL: 'downloadURL',
              size: '1kb',
            },
          },
        },
      };

      instance.handleUploadFileSuccess(result, payload);
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('returns false', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('renders nothing', () => {
      expect(instance.render()).toBeNull();
    });
  });
});
