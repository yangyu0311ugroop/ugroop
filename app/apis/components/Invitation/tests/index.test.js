import { shallow } from 'enzyme';
import React from 'react';
import { DATASTORE_UTILS } from 'datastore';
import { Invitation } from '../index';

describe('<Invitation />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Invitation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Invitation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should call resaga.analyse', () => {
      instance.componentWillReceiveProps({ hi: 'hooo' });

      expect(resaga.analyse).toBeCalled();
      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('should NOT shouldComponentUpdate', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('getTokenSuccess()', () => {
    it('should setValue', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      instance.getTokenSuccess({ hi: 'ho' }, { tokenId: 123 });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith({
        123: { hi: 'ho' },
      });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('getTokenError()', () => {
    it('should setValue', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      instance.getTokenError(333, { tokenId: 123 });

      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith({ 123: null });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
