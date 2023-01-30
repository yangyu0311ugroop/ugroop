import { DATASTORE_UTILS } from 'datastore';
import { shallow } from 'enzyme';
import React from 'react';
import { NodeShare } from '../index';

describe('<NodeShare />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    resaga,
    tourAbilities: { someRole: 'someRole' },
  };

  beforeEach(() => {
    rendered = shallow(<NodeShare {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(NodeShare).toBeDefined();
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

  describe('updateTourAbility()', () => {
    it('should upsertArray', () => {
      DATASTORE_UTILS.upsertArray = jest.fn(() => 'upsertArray');

      instance.updateTourAbility(
        { hi: 'ho' },
        { role: 'someRole', nodeId: 999 },
      );

      expect(DATASTORE_UTILS.upsertArray).toBeCalledWith('999', 'someRole');
      expect(resaga.setValue).toBeCalledWith({
        tours: 'upsertArray',
        hi: 'ho',
      });
    });
  });

  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
