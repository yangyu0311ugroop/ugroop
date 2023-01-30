/**
 * Created by paulcedrick on 7/11/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { INIT_STATE } from '../config';
import { UGSnackbarContainer } from '../index';

describe('UGSnackbarContainer', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  const props = {
    resaga,
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(<UGSnackbarContainer {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('componentDidMount()', () => {
    it('should call initStore', () => {
      instance.initStore = jest.fn();
      instance.componentDidMount();
      expect(instance.initStore).toBeCalled();
    });
  });

  describe('initStore()', () => {
    it('should call setValue', () => {
      instance.initStore();
      expect(resaga.setValue).toBeCalledWith(INIT_STATE);
    });
  });

  describe('handleClose()', () => {
    it('should call initStore', () => {
      instance.initStore = jest.fn();
      instance.handleClose();
      expect(instance.initStore).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
