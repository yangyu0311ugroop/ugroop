import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AbilityResolver } from '../index';

describe('<AbilityResolver />', () => {
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

  beforeEach(() => {
    rendered = shallow(<AbilityResolver {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AbilityResolver).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call updateAbility correctly', () => {
      instance.updateAbility = jest.fn();

      instance.componentDidMount();

      expect(instance.updateAbility).toBeCalledWith(instance.props);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call updateAbility correctly: nodeId change', () => {
      rendered.setProps({ nodeId: 1 });
      instance.updateAbility = jest.fn();

      instance.componentWillReceiveProps({ nodeId: 2 });

      expect(instance.updateAbility).toBeCalledWith({ nodeId: 2 });
    });

    it('should call updateAbility correctly: orgId change', () => {
      rendered.setProps({ orgId: 1 });
      instance.updateAbility = jest.fn();

      instance.componentWillReceiveProps({ orgId: 2 });

      expect(instance.updateAbility).toBeCalledWith({ orgId: 2 });
    });
  });

  describe('updateAbility()', () => {
    it('should call ability.update', () => {
      ability.update = jest.fn();

      instance.updateAbility({ organisation: [1, 2], tour: [3, 4] });

      expect(ability.update).toBeCalledWith([1, 2, 3, 4]);
    });

    it('should call onSuccess', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });
      ability.update = jest.fn();

      instance.updateAbility({ organisation: [1, 2], tour: [3, 4] });

      expect(ability.update).toBeCalledWith([1, 2, 3, 4]);
      expect(onSuccess).toBeCalledWith({ organisation: [1, 2], tour: [3, 4] });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
