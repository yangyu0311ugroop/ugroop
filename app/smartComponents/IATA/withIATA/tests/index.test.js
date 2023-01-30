/**
 * Created by stephenkarpinskyj on 30/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import withIata from '../index';

describe('smartComponents/IATA/withIATA', () => {
  let wrapper;
  let instance;

  const Component = () => <div />;
  const Hoc = withIata()(Component);

  const firebaseMock = {
    queryAirports: jest
      .fn()
      .mockImplementation(() => Promise.resolve([1, 2, 3])),
  };
  const makeProps = () => ({ firebase: firebaseMock });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withIata).toBeDefined();
  });

  describe('#iata.api', () => {
    const params = 'params';
    const callback = 'callback';

    it('sets search', () => {
      instance.iata.api(params, callback);
      expect(instance.search).toBeDefined();
    });

    it('calls search', () => {
      instance.search = jest.fn();
      instance.iata.api(params, callback);
      expect(instance.search).toBeCalledWith(params, callback);
    });
  });

  describe('#api', () => {
    beforeEach(() => {
      const res = new Response('{"x":1}');
      window.fetch = jest.fn(() => Promise.resolve(res));
    });

    const params = 'params';
    const callback = jest.fn();

    it('not calls back if params not matches request', () => {
      instance.params = null;
      instance.api(params, callback);
      expect(callback).not.toBeCalled();
    });

    it('calls back if params matches request', done => {
      instance.params = params;
      instance.api(params, callback).then(() => {
        expect(callback).toBeCalledWith({ city: 1, name: 2, iata: 3 });
        done();
      });
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
