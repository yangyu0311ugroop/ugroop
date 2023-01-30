import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EditableFolderCard } from '../index';

describe('<EditableFolderCard />', () => {
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

  const onCreateInner = jest.fn();

  const cud = {
    onCreate: jest.fn(() => onCreateInner),
  };

  beforeEach(() => {
    rendered = shallow(<EditableFolderCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditableFolderCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onSuccess', () => {
    it('should call setValue of resaga and call the hook parameter which is a function', () => {
      const hook = jest.fn();
      instance.onSuccess(hook)();
      expect(resaga.setValue).toBeCalledWith({
        folderFormOpen: false,
      });
      expect(hook).toBeCalled();
    });
  });

  describe('onSubmit()', () => {
    it('should call dispatchTo', () => {
      const input = { name: 'qweqwe' };
      const payload = { payload: input, onSuccess: 'onSuccess' };
      instance.onSuccess = jest.fn(param => param);
      instance.onCancel = 'onCancel';
      instance.onSubmit(cud)({ form: payload });
      expect(cud.onCreate).toBeCalledWith({
        onSuccess: payload.onSuccess,
        onError: 'onCancel',
      });
      expect(onCreateInner).toBeCalledWith({ form: payload });
    });
  });

  describe('onCancel()', () => {
    it('shuold set folderFormOpen value to false', () => {
      const expected = {
        folderFormOpen: false,
      };
      instance.onCancel();
      expect(resaga.setValue).toBeCalledWith(expected);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      const editableFolder = shallow(
        <div>{instance.renderEditableFolder()({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(toJSON(editableFolder)).toMatchSnapshot();
    });
  });
});
