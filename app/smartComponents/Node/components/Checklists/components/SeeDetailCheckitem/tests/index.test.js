import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { SeeDetailCheckitem } from '../index';

// TODO: this Modal is experimental and will be refactored in the next part
// some tests in this file is temporary and won't be thorough
describe('<SeeDetailCheckitem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 9922,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<SeeDetailCheckitem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SeeDetailCheckitem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should call resaga.setValue', () => {
      instance.handleClose();

      expect(resaga.setValue).toBeCalledWith({ seeCheckItemDetail: null });
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should render correctly', () => {
      rendered.setProps({ status: '' });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if user has permission', () => {
      instance.isTemplate = () => true;
      rendered.setProps({ status: '' });
      instance.canUpdate = () => true;
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
