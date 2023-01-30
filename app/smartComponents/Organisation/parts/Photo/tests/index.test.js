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

  describe('handleUpload()', () => {
    it('should call dispatchTo with particular param', () => {
      instance.handleUpload('photo', 'metaInfo');
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('handleDelete()', () => {
    it('should call dispatchTo with particular param', () => {
      instance.handleDelete();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
