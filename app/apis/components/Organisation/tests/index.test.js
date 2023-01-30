import { shallow } from 'enzyme';
import React from 'react';
import { Organisation } from '../index';

describe('<Organisation />', () => {
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
    rendered = shallow(<Organisation {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Organisation).toBeDefined();
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

  describe('createOrganisationSuccess()', () => {
    it('should call setValue', () => {
      instance.addAbility = jest.fn(() => 'addAbility');
      instance.createOrganisationSuccess({ id: 'processed result' });

      expect(resaga.setValue).toBeCalledWith({ id: 'processed result' });
      expect(instance.addAbility).toBeCalledWith('processed result');
    });
  });

  describe('addAbility()', () => {
    it('should return null', () => {
      rendered.setProps({ organisationOwnerAbilities: [] });

      expect(instance.addAbility('processed result')).toBe(null);
    });

    it('should call setValue', () => {
      rendered.setProps({ resaga, organisationOwnerAbilities: [1, 2] });

      instance.addAbility(2233);

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('orgSyncSuccess()', () => {
    it('should call setValue', () => {
      instance.orgSyncSuccess({ id: 1, x: 2 });

      expect(resaga.setValue).toBeCalled();
      expect(
        resaga.setValue.mock.calls[0][0].accountRelatedOrgs([{ id: 1 }]),
      ).toEqual([{ id: 1, x: 2 }]);
    });
  });

  describe('handleSetupPersonalTourSuccess()', () => {
    it('should call setValue', () => {
      instance.handleSetupPersonalTourSuccess({
        userId: 2332,
        rootNodeId: 299,
      });

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
