import { PATCH_PERSON_FACADE, PERSON_DETAIL_API } from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Photo } from '../index';

describe('<Photo />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 1,
  };

  beforeEach(() => {
    rendered = shallow(<Photo {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Photo).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('personPhoto()', () => {
    it('should personPhoto()', () => {
      rendered.setProps({ photo: [1, 2] });

      expect(instance.personPhoto()).toBe(2);
    });
  });

  describe('handleUpload()', () => {
    it('should call dispatchTo with particular param', () => {
      instance.handleUpload('photo', {
        x: '1',
        y: '1',
        height: '1',
        width: '1',
        scale: '1',
        rotate: '0',
      });
      expect(resaga.dispatchTo).toBeCalledWith(
        PERSON_DETAIL_API,
        PATCH_PERSON_FACADE,
        {
          payload: {
            data: {
              photo: {
                url: 'photo',
                x: '1',
                y: '1',
                height: '1',
                width: '1',
                scale: '1',
                rotate: '0',
              },
            },
            userId: 1,
          },
        },
      );
    });
  });

  describe('handleDelete()', () => {
    it('should call dispatchTo with particular param and if photo is not empty', () => {
      rendered.setProps({
        photo: 'photo',
      });
      instance.handleDelete();
      expect(resaga.dispatchTo).toBeCalledWith(
        PERSON_DETAIL_API,
        PATCH_PERSON_FACADE,
        {
          payload: {
            data: {
              photo: null,
            },
            userId: 1,
            oldPhoto: 'photo',
          },
        },
      );
    });
    it('should call dispatchTo with particular param and if photo is empty', () => {
      rendered.setProps({
        photo: '',
      });
      instance.handleDelete();
      expect(resaga.dispatchTo).toBeCalledWith(
        PERSON_DETAIL_API,
        PATCH_PERSON_FACADE,
        {
          payload: {
            data: {
              photo: null,
            },
            userId: 1,
            oldPhoto: '',
          },
        },
      );
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
